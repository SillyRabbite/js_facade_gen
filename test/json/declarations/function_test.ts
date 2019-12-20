import {ConvertedSyntaxKind} from '../../../lib/json/converted_syntax_kinds';

import {expectTranslateJSON, prettyStringify} from '../json_test_support';

describe('functions', () => {
  it('supports function declarations', () => {
    expectTranslateJSON('declare function f(): boolean;').to.equal(prettyStringify({
      kind: ConvertedSyntaxKind.SourceFile,
      fileName: 'demo/some/main.ts',
      statements: [{
        kind: ConvertedSyntaxKind.FunctionDeclaration,
        modifiers: [],
        name: 'f',
        parameters: [],
        type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'boolean'}
      }]
    }));
  });

  it('supports parameters', () => {
    expectTranslateJSON('declare function f(a: number, b: string): void;')
        .to.equal(prettyStringify({
          kind: ConvertedSyntaxKind.SourceFile,
          fileName: 'demo/some/main.ts',
          statements: [{
            kind: ConvertedSyntaxKind.FunctionDeclaration,
            modifiers: [],
            name: 'f',
            parameters: [
              {
                kind: ConvertedSyntaxKind.Parameter,
                name: 'a',
                optional: false,
                rest: false,
                type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'number'}
              },
              {
                kind: ConvertedSyntaxKind.Parameter,
                name: 'b',
                optional: false,
                rest: false,
                type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'string'}
              }
            ],
            type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'void'}
          }]
        }));
  });

  it('supports optional parameters', () => {
    expectTranslateJSON('declare function f(a: number, b?: string): void;')
        .to.equal(prettyStringify({
          kind: ConvertedSyntaxKind.SourceFile,
          fileName: 'demo/some/main.ts',
          statements: [{
            kind: ConvertedSyntaxKind.FunctionDeclaration,
            modifiers: [],
            name: 'f',
            parameters: [
              {
                kind: ConvertedSyntaxKind.Parameter,
                name: 'a',
                optional: false,
                rest: false,
                type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'number'}
              },
              {
                kind: ConvertedSyntaxKind.Parameter,
                name: 'b',
                optional: true,
                rest: false,
                type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'string'}
              }
            ],
            type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'void'}
          }]
        }));
  });

  it('supports rest parameters', () => {
    expectTranslateJSON('declare function f(...a: number[]): void;').to.equal(prettyStringify({
      kind: ConvertedSyntaxKind.SourceFile,
      fileName: 'demo/some/main.ts',
      statements: [{
        kind: ConvertedSyntaxKind.FunctionDeclaration,
        modifiers: [],
        name: 'f',
        parameters: [{
          kind: ConvertedSyntaxKind.Parameter,
          name: 'a',
          optional: false,
          rest: true,
          type: {
            kind: ConvertedSyntaxKind.TypeReference,
            typeName: 'Array',
            typeArguments: [{kind: ConvertedSyntaxKind.KeywordType, typeName: 'number'}]
          }
        }],
        type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'void'}
      }]
    }));
  });

  it('supports destructured object parameters', () => {
    expectTranslateJSON('declare function f({a, b}: {a:number, b: string}): void;')
        .to.equal(prettyStringify({
          kind: ConvertedSyntaxKind.SourceFile,
          fileName: 'demo/some/main.ts',
          statements: [{
            kind: ConvertedSyntaxKind.FunctionDeclaration,
            modifiers: [],
            name: 'f',
            parameters: [{
              kind: ConvertedSyntaxKind.Parameter,
              name: {
                kind: ConvertedSyntaxKind.ObjectBindingPattern,
                elements: [
                  {kind: ConvertedSyntaxKind.BindingElement, name: 'a', rest: false},
                  {kind: ConvertedSyntaxKind.BindingElement, name: 'b', rest: false}
                ]
              },
              optional: false,
              rest: false,
              type: {
                kind: ConvertedSyntaxKind.TypeLiteral,
                members: [
                  {
                    kind: ConvertedSyntaxKind.PropertyDeclaration,
                    name: 'a',
                    optional: false,
                    type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'number'}
                  },
                  {
                    kind: ConvertedSyntaxKind.PropertyDeclaration,
                    name: 'b',
                    optional: false,
                    type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'string'}
                  }
                ]
              }
            }],
            type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'void'}
          }]
        }));
  });

  it('supports type predicate return types', () => {
    expectTranslateJSON('declare function f(x: number|string): x is number;')
        .to.equal(prettyStringify({
          kind: ConvertedSyntaxKind.SourceFile,
          fileName: 'demo/some/main.ts',
          statements: [{
            kind: ConvertedSyntaxKind.FunctionDeclaration,
            modifiers: [],
            name: 'f',
            parameters: [{
              kind: ConvertedSyntaxKind.Parameter,
              name: 'x',
              optional: false,
              rest: false,
              type: {
                kind: ConvertedSyntaxKind.UnionType,
                types: [
                  {kind: ConvertedSyntaxKind.KeywordType, typeName: 'number'},
                  {kind: ConvertedSyntaxKind.KeywordType, typeName: 'string'}
                ]
              }
            }],
            type: {
              kind: ConvertedSyntaxKind.TypePredicate,
              assertsModifier: false,
              parameterName: 'x',
              type: {kind: ConvertedSyntaxKind.KeywordType, typeName: 'number'}
            }
          }]
        }));
  });

  it('supports recursive function parameters', () => {
    expectTranslateJSON('declare function f(fn: (a: (b: B) => C) => D);').to.equal(prettyStringify({
      kind: ConvertedSyntaxKind.SourceFile,
      fileName: 'demo/some/main.ts',
      statements: [{
        kind: ConvertedSyntaxKind.FunctionDeclaration,
        modifiers: [],
        name: 'f',
        parameters: [{
          kind: ConvertedSyntaxKind.Parameter,
          name: 'fn',
          optional: false,
          rest: false,
          type: {
            kind: ConvertedSyntaxKind.FunctionType,
            parameters: [{
              kind: ConvertedSyntaxKind.Parameter,
              name: 'a',
              optional: false,
              rest: false,
              type: {
                kind: ConvertedSyntaxKind.FunctionType,
                parameters: [{
                  kind: ConvertedSyntaxKind.Parameter,
                  name: 'b',
                  optional: false,
                  rest: false,
                  type: {kind: ConvertedSyntaxKind.TypeReference, typeName: 'B'}
                }],
                type: {kind: ConvertedSyntaxKind.TypeReference, typeName: 'C'}
              }
            }],
            type: {kind: ConvertedSyntaxKind.TypeReference, typeName: 'D'}
          }
        }],
      }]
    }));
  });
});