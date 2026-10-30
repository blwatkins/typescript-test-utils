/*
 * Copyright (c) 2026 Brittni Watkins.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * SPDX-License-Identifier: MIT
 */

/**
 * Inputs that are not primitive numbers.
 *
 * @type {unknown[]}
 * @since 0.1.0
 * @category Number
 */
// noinspection JSPrimitiveTypeWrapperUsage
export const nonNumberInputs: unknown[] = [
    null,
    undefined,
    10n,
    -10n,
    true,
    false,
    '',
    'string',
    '\n\t',
    '     ',
    '5',
    '5.5',
    '-5',
    '0',
    [],
    ['value'],
    [1, 2, 3],
    (): string => 'value',
    (): number => 10,
    (): unknown[] => [],
    (): object => {
        return {};
    },
    Math.random,
    new Number(10),
    new String('value'),
    new Object(10),
    new Object('value'),
    {},
    { key: 'value' },
    { key: 10 },
    { key: [] },
    { key: {} },
    Symbol('test')
];

/**
 * The inputs in {@link nonNumberInputs}, excluding `undefined`.
 *
 * @type {unknown[]}
 * @since 0.1.0
 * @category Number
 */
export const definedNonNumberInputs: unknown[] = nonNumberInputs.filter((input: unknown): boolean => {
    return input !== undefined;
});

/**
 * Numbers that are not finite: `NaN`, `Infinity`, and `-Infinity`.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const nonFiniteNumberInputs: number[] = [
    NaN,
    Infinity,
    -Infinity
];

/**
 * Positive and negative zero.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const zeroInputs: number[] = [0, -0];

/**
 * Finite negative numbers below `Number.MIN_SAFE_INTEGER`.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const negativeUnsafeNumberInputs: number[] = [
    -Number.MAX_VALUE,
    Number.MIN_SAFE_INTEGER - 1,
    Number.MIN_SAFE_INTEGER - 2.5
];

/**
 * Finite positive numbers above `Number.MAX_SAFE_INTEGER`.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const positiveUnsafeNumberInputs: number[] = [
    Number.MAX_VALUE,
    Number.MAX_SAFE_INTEGER + 1,
    Number.MAX_SAFE_INTEGER + 2.5
];

/**
 * Finite numbers outside the safe integer range, combining {@link negativeUnsafeNumberInputs} and {@link positiveUnsafeNumberInputs}.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const unsafeNumberInputs: number[] = [
    ...negativeUnsafeNumberInputs,
    ...positiveUnsafeNumberInputs
];

/**
 * Negative non-integer numbers within the safe integer range.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const negativeSafeFloatInputs: number[] = [
    -Number.MIN_VALUE,
    -Number.EPSILON,
    -10.01,
    -0.01,
    -(1.0 / 3)
];

/**
 * Positive non-integer numbers within the safe integer range.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const positiveSafeFloatInputs: number[] = [
    Number.MIN_VALUE,
    Number.EPSILON,
    10.01,
    0.01,
    (1.0 / 3)
];

/**
 * Non-integer numbers within the safe integer range, combining {@link negativeSafeFloatInputs} and {@link positiveSafeFloatInputs}.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const safeFloatInputs: number[] = [
    ...negativeSafeFloatInputs,
    ...positiveSafeFloatInputs
];

/**
 * Negative safe integers, down to `Number.MIN_SAFE_INTEGER`.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const negativeSafeIntegerInputs: number[] = [
    Number.MIN_SAFE_INTEGER,
    -1,
    -10,
    -100,
    -1000,
    -10000.0
];

/**
 * Positive safe integers, up to `Number.MAX_SAFE_INTEGER`.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const positiveSafeIntegerInputs: number[] = [
    Number.MAX_SAFE_INTEGER,
    1,
    10,
    100,
    1000,
    10000.0
];

/**
 * Nonzero safe integers, combining {@link negativeSafeIntegerInputs} and {@link positiveSafeIntegerInputs}.
 *
 * @remarks Zero is not included. See {@link zeroInputs}.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const safeIntegerInputs: number[] = [
    ...negativeSafeIntegerInputs,
    ...positiveSafeIntegerInputs
];

/**
 * Positive safe numbers, combining {@link positiveSafeFloatInputs} and {@link positiveSafeIntegerInputs}.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const positiveSafeNumberInputs: number[] = [
    ...positiveSafeFloatInputs,
    ...positiveSafeIntegerInputs
];

/**
 * Negative safe numbers, combining {@link negativeSafeFloatInputs} and {@link negativeSafeIntegerInputs}.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const negativeSafeNumberInputs: number[] = [
    ...negativeSafeFloatInputs,
    ...negativeSafeIntegerInputs
];

/**
 * Nonzero safe numbers, combining {@link positiveSafeNumberInputs} and {@link negativeSafeNumberInputs}.
 *
 * @remarks Zero is not included. See {@link zeroInputs}.
 *
 * @type {number[]}
 * @since 0.1.0
 * @category Number
 */
export const safeNumberInputs: number[] = [
    ...positiveSafeNumberInputs,
    ...negativeSafeNumberInputs
];

/**
 * Inputs that are not safe numbers, combining {@link nonNumberInputs}, {@link nonFiniteNumberInputs}, and {@link unsafeNumberInputs}.
 *
 * @type {unknown[]}
 * @since 0.1.0
 * @category Number
 */
export const invalidSafeNumberInputs: unknown[] = [
    ...nonNumberInputs,
    ...nonFiniteNumberInputs,
    ...unsafeNumberInputs
];

/**
 * Inputs that are not safe positive integers, combining {@link invalidSafeNumberInputs}, {@link safeFloatInputs}, and {@link negativeSafeIntegerInputs}.
 *
 * @remarks Zero is not included. See {@link zeroInputs}.
 *
 * @type {unknown[]}
 * @since 0.1.0
 * @category Number
 */
export const invalidSafePositiveIntegerInputs: unknown[] = [
    ...invalidSafeNumberInputs,
    ...safeFloatInputs,
    ...negativeSafeIntegerInputs
];

/**
 * The inputs in {@link invalidSafePositiveIntegerInputs}, excluding `undefined`.
 *
 * @remarks Zero is not included. See {@link zeroInputs}.
 *
 * @type {unknown[]}
 * @since 0.1.0
 * @category Number
 */
export const definedInvalidSafePositiveIntegerInputs: unknown[] = invalidSafePositiveIntegerInputs.filter((input: unknown): boolean => {
    return input !== undefined;
});
