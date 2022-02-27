
function add(a,b, callback) {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
}

add(10, 3, (data) => {
 if (data % 2 === 0)  console.log(`${data} es par!`);
 else { console.log(`${data} es impar!`)}
});