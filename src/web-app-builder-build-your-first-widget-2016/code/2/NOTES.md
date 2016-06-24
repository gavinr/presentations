* update Widget.js
  * uncomment onOpen, onClose, SHOW
  * don't forget comma
  * code snippet:

    ```
    import on from 'dojo/on';
    ```
    
    ```
    this.mapClickHandler = on(this.sceneView, 'click', (evt) => {
      console.log('CLICKED', evt);
    });
    ```
  
  * code snippet:
  
    ```
    if(this.mapClickHandler) {
      this.mapClickHandler.remove();
    }
    ```
