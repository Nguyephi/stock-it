# Atoms

Atoms are the smallest building blocks of a design system. They represent basic HTML elements and components that cannot be broken down further without losing their meaning or purpose. Atoms are typically styled and are used consistently across the application.

## Example

**Button**

```jsx
import React from 'react';
import './Button.css';

const Button = ({ label, onClick }) => (
  <button className="button" onClick={onClick}>
    {label}
  </button>
);

export default Button;
```