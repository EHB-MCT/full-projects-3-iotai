'use strict';

import { renderNav, renderSocials } from './footer.js';
import { renderHeader } from './header.js';

window.onload = async () => {
    await renderSocials();
};
