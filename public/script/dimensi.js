function hitungDimensi() {
  var panjang = document.getElementById("panjang").value;
  var lebar = document.getElementById("lebar").value;
  var dimensi = panjang * lebar;
  document.getElementById("dimensi").value = dimensi;
}
