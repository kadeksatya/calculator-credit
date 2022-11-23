

// Back To Form Input
$(".aturUlang").click(function (e) {
  $(".form-input").removeClass('d-none');
  $(".form-result").addClass('d-none');
  $(".form-result-deposite").addClass('d-none');
  $('#FormInputs').reset();
  getDataPlugin();
});



// Get data input range & get values
$(document).on('input', '#rangeamount', function () {
  let values = $(this).val();
  $('.amount').val(format(values));
});

// Jquery elemet start here

$(document).ready(function () {
  $(".resetForm").click(function (e) {
    jQuery('.amount').val('0');
    jQuery('.time_period_deposito').val('').trigger('change');
    jQuery('.amount_depo').val('0')
    jQuery('.suku_bunga').val('0')
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
      e.style.setProperty('--value', e.value);
      e.style.setProperty('--min', e.min == '' ? '0' : e.min);
      e.style.setProperty('--max', e.max == '' ? '100' : e.max);
      e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
  });

  $('.time_period_deposito').select2();

  for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
  }

  let suku_bunga_result = $('.suku_bunga');





  // Conditional



  // Ganti Suku Bunga Deposite

  $('.time_period_deposito').change(function (e) {
    let suku_bunga = $(this).val();
    suku_bunga_result.text(suku_bunga);

  });

  // Ganti Suku Bunga Pajak


  // Function hitung data angsuran

  // Check Result
  $(".submitForm").click(function (e) {

    let pajak = 0.2
    let suku_bunga_deposite = $('.time_period_deposito').find(":selected").val();
    let jangka_waktu_deposite = $('.time_period_deposito').find(':selected').attr('data-time')
    let amount = $('.amount').val();
    let amount_converted = amount.replace(/,/g, '');
    let hasil_deposito_1 = $('.hasil_deposito_1');
    let hasil_deposito_2 = $('.hasil_deposito_2');
    let hasil_deposito_3 = $('.hasil_deposito_3');

    console.log(amount_converted);



      total_bunga = (parseInt(amount_converted) * (parseFloat(suku_bunga_deposite) / 100));
      let total_bunga_per_bulan = parseFloat(total_bunga) / parseInt(jangka_waktu_deposite);
      let total_pajak = parseFloat(total_bunga_per_bulan) * parseFloat(pajak)
      let total_bunga_kurang_pajak = parseFloat(total_bunga_per_bulan) - parseFloat(total_pajak);
      let total_bunga_semua = parseInt(total_bunga_kurang_pajak) * parseInt(jangka_waktu_deposite)
      let total_plus_bunga = parseFloat(amount_converted) + parseFloat(total_bunga_semua);

      hasil_deposito_1.text(parseInt(total_plus_bunga).toLocaleString());
      hasil_deposito_2.text(parseInt(total_bunga_kurang_pajak).toLocaleString());
      hasil_deposito_3.text(total_bunga_semua.toLocaleString());

      $(".form-input").addClass('d-none');
      $(".form-result-deposite").removeClass('d-none');
   


  });



});



// Currency Format 

$(function(){
  $(".amount").keyup(function(e){
    $(this).val(format($(this).val()));
    let values = $(this).val().replace(/,/g, '');
    $('.amount_depo').val(values)
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
      e.style.setProperty('--value', e.value);
      e.style.setProperty('--min', e.min == '' ? '0' : e.min);
      e.style.setProperty('--max', e.max == '' ? '100' : e.max);
      e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
  });
});
var format = function(num){
  var str = num.toString().replace("", ""), parts = false, output = [], i = 1, formatted = null;
  if(str.indexOf(".") > 0) {
    parts = str.split(".");
    str = parts[0];
  }
  str = str.split("").reverse();
  for(var j = 0, len = str.length; j < len; j++) {
    if(str[j] != ",") {
      output.push(str[j]);
      if(i%3 == 0 && j < (len - 1)) {
        output.push(",");
      }
      i++;
    }
  }
  formatted = output.reverse().join("");
  return("" + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
};