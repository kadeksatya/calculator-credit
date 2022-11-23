// Reset Forms 




// Check Result
$(".submitForm").click(function (e) {
  if (!$('.product').val()) {
    alert("Minimal Pilih 1 product");
  } else if ($('.amount').val() == 0) {
    alert("Minimal Nominal masih 0");
  } else {
    $(".form-input").addClass('d-none');
    $(".form-result").removeClass('d-none');
  }


});

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

  $('.product').select2();
  $('.time_period_credit').select2();
  $('.time_period_deposito').select2();

  for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
  }

  let suku_bunga_result = $('.suku_bunga');





  // Conditional


  $('.product').change(function (e) {
    let values = $(this).val();
    suku_bunga_result.text('0');

    if (values == 'DEPOSITO') {
      $('.time_period_credit_element').addClass('d-none');
      $('.time_period_deposite_element').removeClass('d-none');
      $('.tax_element').removeClass('d-none');
      $('.who_is_element').addClass('d-none');

    }
    if (values == 'KREDIT_SERTIFIKASI') {
      $('.who_is_element').removeClass('d-none');
      $('.tax_element').addClass('d-none');
      $('.time_period_credit_element').removeClass('d-none');
      $('.time_period_deposite_element').addClass('d-none');
    }
    if (values != 'KREDIT_SERTIFIKASI' && values != 'DEPOSITO') {
      $('.who_is_element').addClass('d-none');
      $('.tax_element').addClass('d-none');
      $('.time_period_credit_element').removeClass('d-none');
      $('.time_period_deposite_element').addClass('d-none');
    }
  });


  // Ganti Suku Bunga Deposite

  $('.time_period_deposite').change(function (e) {
    let suku_bunga = $(this).val();
    suku_bunga_result.text(suku_bunga);

  });

  // Ganti Suku Bunga Pajak

  $('.time_period_credit').change(function (e) {
    let product = $('.product').find(":selected").val();
    let jangka_waktu = $(this).val();
    let who_is = $('.who_is_input').val();
    let suku_bunga = 0
    let result = 0;

    if (product == 'KREDIT_SERTIFIKASI') {
      if(who_is == 'PNS'){
        suku_bunga = 1.25;
      }else{
        suku_bunga = 1.4;

      }
    }else{
      suku_bunga = 1.5;
    }

    result = jangka_waktu * suku_bunga;

    suku_bunga_result.text(result.toFixed(2));

  });


  // Function hitung data angsuran

  // Check Result
  $(".submitForm").click(function (e) {

    let sub_total = 0
    let who_is = $('.who_is_input').val();
    let total = 0
    let suku_bunga = 0
    let tota_bunga = 0
    let pajak = 0.2
    let angsuran = 0
    let product = $('.product').find(":selected").val();
    let suku_bunga_deposite = $('.time_period_deposite').find(":selected").val();
    let jangka_waktu_deposite = $('.time_period_deposite').find(':selected').attr('data-time')
    let jangka_waktu_credit = $('.time_period_credit').find(":selected").val();
    let amount = $('.amount').val();
    let amount_converted = amount.replace(/,/g, '');
    let hasil_credit = $('.hasil_credit');
    let hasil_deposito_1 = $('.hasil_deposito_1');
    let hasil_deposito_1_bunga = $('.hasil_deposito_1_bunga');
    let hasil_deposito_2 = $('.hasil_deposito_2');
    let hasil_deposito_3 = $('.hasil_deposito_3');

    console.log(amount_converted);
    console.log(jangka_waktu_deposite);

    if (!$('.product').val()) {
      alert("Minimal Pilih 1 product");
    }


    if (product == 'KREDIT_SERTIFIKASI') {
      if(who_is == 'PNS'){
        suku_bunga = 1.25;

      }else{
      suku_bunga = 1.4;
      }
      angsuran = parseInt(amount_converted) / parseInt(jangka_waktu_credit)
      sub_total = (parseInt(amount_converted) * (parseFloat(suku_bunga) / 100));
      total = parseInt(angsuran) + parseFloat(sub_total)
      hasil_credit.text(total.toLocaleString());

      $(".form-input").addClass('d-none');
      $(".form-result-deposite").addClass('d-none');
      $(".form-result").removeClass('d-none');

    }
    if (product == 'DEPOSITO') {


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
      $(".form-result").addClass('d-none');
      $(".form-result-deposite").removeClass('d-none');
    } else {

      suku_bunga = 1.5;
      angsuran = parseInt(amount_converted) / parseInt(jangka_waktu_credit)
      sub_total = (parseInt(amount_converted) * (parseFloat(suku_bunga) / 100));
      total = parseInt(angsuran) + parseFloat(sub_total)
      hasil_credit.text(total.toLocaleString());

    }


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