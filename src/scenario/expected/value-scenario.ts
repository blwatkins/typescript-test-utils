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

import { MultiInputScenario, SingleInputScenario, isMultiInputScenario, isSingleInputScenario } from '../input';

/**
 * A scenario that is expected to return a value without throwing any errors.
 *
 * @since 0.1.0
 */
export type ValueScenario = (MultiInputScenario | SingleInputScenario) & {
    /**
     * The outcome expected for every input.
     *
     * @type {unknown}
     * @readonly
     * @since 0.1.0
     */
    readonly expected: unknown;

    /**
     * The error expected to be thrown for every input.
     *
     * @remarks A {@link ValueScenario} should never throw an error.
     *
     * @type {never}
     * @readonly
     * @since 0.1.0
     */
    readonly expectedError?: never;
};

/**
 * Is `input` a {@link ValueScenario}?
 *
 * @remarks For `input` to be a valid {@link ValueScenario}, it must have an `expected` property, and it cannot have a defined `expectedError` property.
 *
 * @see {@link isMultiInputScenario}
 * @see {@link isSingleInputScenario}
 *
 * @param {unknown} input - The input to check.
 *
 * @returns {input is ValueScenario}
 *
 * @since 0.1.0
 */
export function isValueScenario(input: unknown): input is ValueScenario {
    return (isMultiInputScenario(input) || isSingleInputScenario(input))
        && 'expected' in input
        && (!('expectedError' in input) || input.expectedError === undefined);
}
