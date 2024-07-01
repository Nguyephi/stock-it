# Organism

Organisms are more complex components that combine molecules and/or atoms together to form distinct sections of an interface. They represent relatively large sections of UI that can be reused across different parts of an application.

## Example

**Header**

```jsx
import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';

const Header = () => (
  <header className="header">
    <Logo />
    <Navigation />
  </header>
);

export default Header;
```