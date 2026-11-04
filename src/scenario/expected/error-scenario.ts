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

import { ErrorConstructor } from '../../error';

import { MultiInputScenario, SingleInputScenario, isMultiInputScenario, isSingleInputScenario } from '../input';

/**
 * A scenario that is expected to throw an error.
 *
 * @since 0.1.0
 */
export type ErrorScenario = (MultiInputScenario | SingleInputScenario) & {
    /**
     * The error expected to be thrown for every input.
     *
     * @type {ErrorConstructor}
     * @readonly
     * @since 0.1.0
     */
    readonly expectedError: ErrorConstructor;

    /**
     * The outcome expected for every input.
     *
     * @remarks An {@link ErrorScenario} should never have an expected outcome.
     *
     * @type {never}
     * @readonly
     * @since 0.1.0
     */
    readonly expected?: never;
};

/**
 * Is `input` an {@link ErrorScenario}?
 *
 * @remarks For `input` to be a valid {@link ErrorScenario}, it must have an `expectedError` property, and it cannot have an `expected` property.
 *
 * @see {@link isMultiInputScenario}
 * @see {@link isSingleInputScenario}
 *
 * @param {unknown} input - The input to check.
 *
 * @returns {input is ErrorScenario} `true` if input is an {@link ErrorScenario} object; `false` otherwise.
 */
export function isErrorScenario(input: unknown): input is ErrorScenario {
    return (isMultiInputScenario(input) || isSingleInputScenario(input))
        && 'expectedError' in input
        && (!('expected' in input) || input.expected === undefined);
}
