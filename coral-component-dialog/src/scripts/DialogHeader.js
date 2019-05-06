/**
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ComponentMixin} from '../../../coral-mixin-component';

const CLASSNAME = '_coral-Dialog-title';

/**
 @class Coral.Dialog.Header
 @classdesc The Dialog header content
 @htmltag coral-dialog-header
 @extends {HTMLElement}
 @extends {ComponentMixin}
 */
class DialogHeader extends ComponentMixin(HTMLElement) {
  /** @ignore */
  connectedCallback() {
    this.classList.add(CLASSNAME);
  
    this.setAttribute('role', 'heading');
    this.setAttribute('aria-level', '2');
  }
}

export default DialogHeader;