// eslint-disable-next-line import/no-extraneous-dependencies
import ts, { factory } from 'typescript';

function updateCallExpression(node: ts.CallExpression, paths: string[]) {
  const options = node.arguments[0];

  if (ts.isObjectLiteralExpression(options)) {
    return factory.updateCallExpression(
      node,
      node.expression,
      node.typeArguments,
      [
        factory.updateObjectLiteralExpression(options, [
          ...options.properties,
          factory.createPropertyAssignment(
            'keySelector',
            factory.createCallExpression(
              factory.createIdentifier('composeKeySelectors'),
              undefined,
              paths.map((path) =>
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createCallExpression(
                      factory.createIdentifier('prop'),
                      undefined,
                      [],
                    ),
                    path,
                  ),
                  undefined,
                  [],
                ),
              ),
            ),
          ),
        ]),
      ],
    );
  }

  return node;
}

function visitNode(node: ts.Node, program: ts.Program): ts.Node | undefined {
  const checker = program.getTypeChecker();

  if (ts.isCallExpression(node) && ts.isCallExpression(node.expression)) {
    if (node.expression.expression.getText() !== 'createCachedSelector') {
      return node;
    }

    const signage = checker.getResolvedSignature(node.expression);
    if (signage) {
      const type = checker.getReturnTypeOfSignature(signage);

      if (type.aliasSymbol?.getName() === 'OutputParametricCachedSelector') {
        const propAliasTypeArgument = type.aliasTypeArguments?.[1];

        if (type && propAliasTypeArgument) {
          const properties = checker.getPropertiesOfType(propAliasTypeArgument);

          const paths = properties.map((property) => property.getName());
          return updateCallExpression(node, paths);
        }

        return node;
      }
    }
    return node;
  }
  return node;
}

function visitNodeAndChildren(
  node: ts.SourceFile,
  program: ts.Program,
  context: ts.TransformationContext,
): ts.SourceFile;
function visitNodeAndChildren(
  node: ts.Node,
  program: ts.Program,
  context: ts.TransformationContext,
): ts.Node | undefined;
function visitNodeAndChildren(
  node: ts.Node,
  program: ts.Program,
  context: ts.TransformationContext,
): ts.Node | undefined {
  return ts.visitEachChild(
    visitNode(node, program),
    (childNode) => visitNodeAndChildren(childNode, program, context),
    context,
  );
}

export default function transformer(
  program: ts.Program,
): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (file: ts.SourceFile) => {
    const sourceFile = visitNodeAndChildren(file, program, context);

    return factory.updateSourceFile(sourceFile, [
      factory.createImportDeclaration(
        /* decorators */ undefined,
        /* modifiers */ undefined,
        factory.createImportClause(
          false,
          undefined,
          factory.createNamedImports([
            factory.createImportSpecifier(
              undefined,
              factory.createIdentifier('prop'),
            ),
          ]),
        ),
        factory.createStringLiteral('reselect-utils'),
      ),
      ...sourceFile.statements,
    ]);
  };
}
