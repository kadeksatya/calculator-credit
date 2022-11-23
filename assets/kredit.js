// Reset Forms 




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
    jQuery('.product').val('').trigger('change');
    jQuery('.time_period_credit').val('').trigger('change');
    jQuery('.time_period_deposito').val('').trigger('change');
    jQuery('.amount_depo').val(0)
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
      e.style.setProperty('--value', e.value);
      e.style.setProperty('--min', e.min == '' ? '0' : e.min);
      e.style.setProperty('--max', e.max == '' ? '100' : e.max);
      e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
  });

  $('.time_period_credit').select2();

  for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
  }

  let suku_bunga_result = $('.suku_bunga');



  $('.time_period_credit').change(function (e) {
    let jangka_waktu = $(this).val();
    let suku_bunga = 1.5
    let result = 0;

    result = jangka_waktu * suku_bunga;

    suku_bunga_result.text(result.toFixed(2));

  });


  // Function hitung data angsuran

  // Check Result
  $(".submitForm").click(function (e) {

    let sub_total = 0
    let total = 0
    let suku_bunga = 0
    let angsuran = 0
    let jangka_waktu_credit = $('.time_period_credit').find(":selected").val();
    let amount = $('.amount').val();
    let amount_converted = amount.replace(/,/g, '');
    let hasil_credit = $('.hasil_credit');




      suku_bunga = 1.5;
      angsuran = parseInt(amount_converted) / parseInt(jangka_waktu_credit)
      sub_total = (parseInt(amount_converted) * (parseFloat(suku_bunga) / 100));
      total = parseInt(angsuran) + parseFloat(sub_total)
      hasil_credit.text(total.toLocaleString());

      $(".form-result").removeClass('d-none');
      $(".form-input").addClass('d-none');



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