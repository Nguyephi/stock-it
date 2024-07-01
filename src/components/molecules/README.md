# Molecules

Molecules are groups of atoms bonded together to form a relatively simple component. They are the smallest fundamental units of a functional component that can be independently reused. Molecules usually serve specific purposes within an interface.

## Example

**SearchBar**

```jsx
import React from 'react';
import Input from './Input';
import Button from './Button';

const SearchBar = ({ onSubmit }) => (
  <div className="search-bar">
    <Input type="text" placeholder="Search..." />
    <Button label="Search" onClick={onSubmit} />
  </div>
);

export default SearchBar;
```