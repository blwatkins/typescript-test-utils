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
 * The base interface for every scenario, holding the label that describes its inputs.
 *
 * @since 0.1.0
 */
export interface BaseScenario {
    /**
     * The label to describe the inputs.
     *
     * @type {string}
     * @readonly
     * @since 0.1.0
     */
    readonly label: string;
}

/**
 * Is `input` a {@link BaseScenario}?
 *
 * @remarks For `input` to be a valid {@link BaseScenario}, it must be an object with a {@link BaseScenario.label} property.
 * The {@link BaseScenario.label} property must be a string.
 *
 * @param {unknown} input - The input to check.
 *
 * @returns {input is BaseScenario}
 *
 * @since 0.1.0
 */
export function isBaseScenario(input: unknown): input is BaseScenario {
    return input !== null && typeof input === 'object' && !Array.isArray(input)
        && 'label' in input && typeof input.label === 'string';
}
