# Templates

Templates are higher-level structures that provide context and define the layout for assembling various organisms into pages or screens. They act as reusable skeletons that help maintain consistency in the overall design and layout of different views.

## Example

**MainLayout (Template)**

```jsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <Header />
    <div className="content">
      <Sidebar />
      <main>{children}</main>
    </div>
    <Footer />
  </div>
);

export default MainLayout;
```