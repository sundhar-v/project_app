import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ligula ex, finibus eu enim non, semper mattis libero. Nulla volutpat efficitur mi, id ultricies metus lobortis vel. Donec feugiat orci sit amet lorem finibus viverra. Duis lectus dui, cursus sodales sapien et, euismod commodo felis. Nullam congue nulla id mauris luctus maximus. Donec ullamcorper tortor id dapibus interdum. Phasellus imperdiet orci ut sapien sagittis, non posuere eros varius. Nunc congue elit congue, pulvinar turpis sit amet, vehicula neque. In tempor accumsan consequat. Duis ullamcorper aliquet lectus, eu luctus purus iaculis a."

const App = () => {
  return (
    <>
      <h1>{"Heading 1"}</h1>
      <h2>{"Heading 2"}</h2>
      <p>{string}</p>
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

