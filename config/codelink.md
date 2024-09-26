# Cara Mengambil Dan Mengonfigurasi Tabel DataBase

### Pembuatan Tabel Dan k
-   Masuk Ke Google Sheet dan buat sheet baru ![](../src/Screenshot_1.jpg)
-   Kemudian Masukan Judul di tabel yang tersedia ![](../src/Screenshot_3.jpg)
-   Setelah judul ditetapkan Klik Bagian Ekstensi yang ditunjuk oleh panah merah ![](../src/Screenshot_2.jpg)
-   Kemudian Pilih App Script
-   Setelah itu kamu akan diarahkan ke bagian editor script ![](../src/Screenshot_4.jpg) ganti judul script dengan *AUTOMATED*
-   Setelah itu hapus Kode default yang telah tersedia ![](../src/Screenshot_5.jpg)
-   Dan Masukan script berikut :   

```
var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
} 
```
- Setelah itu klik icon Save ![](../src/Screenshot_6.jpg)
- Kemudian klik jalankan dan pastikan Kotak Merah berisi `initialsetup` ![](../src/Screenshot_11.jpg)
- Maka akan muncul pemberitahuan akses izin, klik tinjau ![](../src/Screenshot_7.jpg)
- Pilih akun yang ingin digunakan untuk akses ![](../src/Screenshot_8.jpg)
- Kemudian akan muncul Peringatan, klik yang ditunjuk oleh panah merah ![](../src/Screenshot_9.jpg)
- setelah itu klik lanjutkan ke AUTOMATED ![](../src/Screenshot_12.jpg)
- Izinkan pada bilah selanjutnya ![](../src/Screenshot_10.jpg)
- Maka akan muncul log seperti ini ![](../src/Screenshot_13.jpg)
- Kemudian klik terapakan tombol yang di tunjuk oleh panah merah ![](../src/Screenshot_14.jpg)
- ![](../src/Screenshot_15.jpg)
- Di konfigurasi pilih Aplikasi Web ![](../src/Screenshot_16.jpg)
- ![](../src/Screenshot_17.jpg)
- pastikan untuk mengizinkan akses ke akun google![](../src/Screenshot_19.jpg)
- Ketikan nama di desripsi kemudian klik Terapkan ![](../src/Screenshot_18.jpg)
- pastikan untuk menympan url web sebelum menutup jendela ![](../src/Screenshot_20.jpg)
- kemudian masuk ke Tab Trigger/Pemicu (gambar Jam Beker) ![](../src/Screenshot_21.jpg)
- terus klik tombol Tambahkan Pemicu ![](../src/Screenshot_22.jpg)
- Pilih fungsi yang dijalankan menjadi `doPost` ![](../src/Screenshot_23.jpg)
- Pilih jenis acara menjadi Saat Mengirim formulir![](../src/Screenshot_25.jpg)
- ![](../src/Screenshot_26.jpg)
- Setelah itu Klik Simpan
- Masukan Link url tadi ke Pengaturan Kode
- Konfigurasi Selesai
