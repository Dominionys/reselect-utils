// eslint-disable-next-line import/no-extraneous-dependencies
import ts from 'typescript';

function visitNode(node: ts.Node, program: ts.Program): ts.Node | undefined {
  const checker = program.getTypeChecker();

  if (ts.isCallExpression(node)) {
    if (node.expression.getText() !== 'createCachedSelector') {
      return node;
    }
    const signage = checker.getResolvedSignature(node);
    if (signage) {
      const type = checker.getReturnTypeOfSignature(signage);
      const propAliasTypeArgument = type.aliasTypeArguments?.[1];
      if (type && propAliasTypeArgument) {
        const properties = checker.getPropertiesOfType(propAliasTypeArgument);
        const paths: string[] = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const property of properties) {
          // const propertyType = checker.getTypeOfSymbolAtLocation(
          //   property,
          //   property.valueDeclaration,
          // );
          // const propertyTypeName = (propertyType as any).intrinsicName;
          // checker.getTypeFromTypeNode(property.valueDeclaration.type).getNonNullableType().getSymbol().getName()
          // const propertyName = checker.symbolToString(property);
          const name = property.getName();

          paths.push(name);
          // console.log(type);
          // console.log(properties);
          // console.log(name, propertyType, propertyName);
        }
        console.log(paths);
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
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    visitNode(node, program),
    (childNode) => visitNodeAndChildren(childNode, program, context),
    context,
  );
}

export default function transformer(
  program: ts.Program,
): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (file: ts.SourceFile) =>
    visitNodeAndChildren(file, program, context);
}
