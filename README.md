# backstretch

a super simple utility for when you can't use background-size: cover ( maybe you want images to be easily saveable/ pinnable ? ); Images will backstretch with window resize to fit container.

    <div class="wrapper backstretch">
        <img data-src="http://placehold.it/600x400" alt="backstretch" >
    </div>
    <script type="text/javascript" src="../src/backstretch.js"></script>
    <script type="text/javascript">
    (function(){
        backstretch.run();
    })();
    </script>

## usage

### `backstretch.run([node])`
searches through a node for any elements with `backstretch` class. Will fall back to using document as search node.

#### example
- `backstretch.run()`
- `backstretch.run( document.getElementById("#content") )`

### `backstretch.clear([node])`
searches through a node for any elements with `backstretch` class and stops applying scale on resize. Will fall back to using document as search node.

#### example
- `backstretch.clear()`
- `backstretch.clear( document.getElementById("#content") )`