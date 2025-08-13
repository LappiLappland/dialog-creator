# Lappi's Dialog Editor  
*Visual GUI Builder for Arma: Cold War Assault (Operation Flashpoint)*  

[![Demo](https://img.shields.io/badge/Web-Live_Editor-22C55E?style=for-the-badge&logo=vercel)](https://demo.yoursite.com) 
![Tool - ARMA CWA](https://img.shields.io/badge/Tool-ARMA_CWA_GUI_Editor-2B337D?style=for-the-badge&logo=bohemiainteractive&logoColor=white)

![Preview](https://github.com/user-attachments/assets/c6c2152f-87d0-49e2-8a1d-36977173df0d)

> Create, import and export Arma Cold War Assault GUIs (dialogs) live in editor without touching config files. Right in your browser!

[Open page to start editing](https://lappilappland.github.io/dialog-creator/)

---

## ✨ Key Features  
- **Drag & resize elements**  
  Move, resize, and arrange elements right in the editor
- **Smart property inspector**  
  Only relevant properties exposed per element type
- **Full elements support**  
  `Static` • `Button` • `ActiveText` • `Edit` • `Combo` • `ListBox` • `Slider`  
  *(Peculiar HTML/3D elements may be added in the future)*
- **Extremely precise visualization**  
  Near 1:1 visual match with in-game appearance. No need to open game to check every change!
- **Import tool**  
  Paste *any* dialog code → Select target class → Start editing immediately
- **Easy export**  
  Save to a file • Copy to clipboard • Copy raw code

---

## 🎥 Live Demonstrations  
| Import | Export |
|-----------------|-----------------|
| ![Import showcase](https://github.com/user-attachments/assets/56dd2876-d136-431f-9c02-835a0e79f16e) | ![Export showcase](https://github.com/user-attachments/assets/7e6706f5-957d-4185-8621-43255fa0aa7f) |

> *As you can see j0e's revive dialog gets imported no problem*

---

## ⚡ Hotkeys  
| Shortcut      | Action                     | Context          |
|---------------|----------------------------|------------------|
| `Ctrl + Z`    | Undo                       | Global           |
| `Ctrl + Y`    | Redo                       | Global           |
| `Ctrl + D`    | Duplicate element          | Editor           |
| `Delete`      | Remove element             | Editor           |
| `Arrow keys`  | Move selected element by 0.1%      | Editor           |
| `Arrow keys` + `alt`  | Move selected element by 0.01%      | Editor           |
| `Arrow keys` + `shift`  | Move selected element by 1%      | Editor           |
| `Arrow keys` + `shift` + `ctrl`  | Move selected element by 10%      | Editor           |
| `Ctrl + A`    | Select all code            | Code View        |

---

## ❓ Possible Questions  

### "Can I import existing dialogs?"  
**YES!** Paste your dialog code (even full config files) → Select target class → Start editing immediately.

### "Why does text look different in-game?"  
Editor uses similar, but not exactly the same fonts for text rendering. Arma doesn't use regular font types

### "My dialog fails to import!"  
This app uses custom C++ parser, specifically crafted for dialogs config. If you are sure your dialog works fine in-game, then report dialog code 

### "Game crashes with exported dialog!"  
Report dialog code

### "Does this work for other Arma games?"  
*Technically it should* for config structure, but visual rendering may differ. This web editor can also be tuned to support other games

---

## 🚀 Getting Started  
1. Visit the [Editor page](https://lappilappland.github.io/dialog-creator/)
2. Start from scratch or **import existing dialog**
3. Use buttons on top to place new elements
4. Edit element properties using right window
5. Rearrange/delete elements using left window
6. Export to game

---
