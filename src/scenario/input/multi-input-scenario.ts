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

import { BaseScenario, isBaseScenario } from '../base';

/**
 * A scenario that describes a set of inputs.
 *
 * @since 0.1.0
 */
export type MultiInputScenario = BaseScenario & {
    /**
     * The inputs the scenario describes.
     *
     * @type {unknown[]}
     * @readonly
     * @since 0.1.0
     */
    readonly inputs: unknown[];

    /**
     * The single input the scenario describes.
     *
     * @remarks A {@link MultiInputScenario} never has a single input.
     *
     * @type {never}
     * @readonly
     * @since 0.1.0
     */
    readonly input?: never;
};

/**
 * Is `input` a {@link MultiInputScenario}?
 *
 * @remarks For `input` to be a valid {@link MultiInputScenario}, it must have an `inputs` property, and it cannot have a defined `input` property.
 * The `inputs` property must be a non-empty array.
 *
 * @see {@link isBaseScenario}
 *
 * @param {unknown} input - The input to check.
 *
 * @returns {input is MultiInputScenario}
 *
 * @since 0.1.0
 */
export function isMultiInputScenario(input: unknown): input is MultiInputScenario {
    return isBaseScenario(input)
        && 'inputs' in input && Array.isArray(input.inputs) && input.inputs.length !== 0
        && (!('input' in input) || input.input === undefined);
}
