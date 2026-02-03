import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/animated-image/animated-image.js";
import "@shoelace-style/shoelace/dist/components/avatar/avatar.js";
import "@shoelace-style/shoelace/dist/components/badge/badge.js";
import "@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js";
import "@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/button-group/button-group.js";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/rating/rating.js";
import "@shoelace-style/shoelace/dist/components/checkbox/checkbox.js";
import "@shoelace-style/shoelace/dist/components/color-picker/color-picker.js";
import "@shoelace-style/shoelace/dist/components/copy-button/copy-button.js";
import "@shoelace-style/shoelace/dist/components/animation/animation.js";
import "@shoelace-style/shoelace/dist/components/details/details.js";
import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import "@shoelace-style/shoelace/dist/components/drawer/drawer.js";
import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import "@shoelace-style/shoelace/dist/components/menu/menu.js";
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js";
import "@shoelace-style/shoelace/dist/components/progress-ring/progress-ring.js";
import "@shoelace-style/shoelace/dist/components/qr-code/qr-code.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";

// Set base path for Shoelace assets
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/",
);

// Page 3 specific behavior - Dynamic select injection
document.getElementById("add-select-btn")?.addEventListener("click", () => {
  const container = document.getElementById("dynamic-content");
  container.innerHTML = `
    <sl-select label="Select one">
      <sl-option value="option-1">Option 1</sl-option>
      <sl-option value="option-2">Option 2</sl-option>
      <sl-option value="option-3">Option 3</sl-option>
    </sl-select>
  `;
});

document.getElementById("add-unknown-btn")?.addEventListener("click", () => {
  document.body.append(document.createElement('not-defined')) 
});

