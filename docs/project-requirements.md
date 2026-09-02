# HatırlaBeni - Yazılım Gereksinimleri Dokümanı (Software Requirements Specification)

## 1. Giriş

HatırlaBeni, 80'ler, 90'lar ve 2000'li yıllardan ilham alan nostaljik ürünlerin satışını yapan web tabanlı bir e-ticaret platformudur. Platform, özenle seçilmiş ürünlerle kullanıcılara geçmişe dair anılar yaşatırken keyifli ve modern bir alışveriş deneyimi sunmayı amaçlamaktadır.

### 1.1 Amaç

Bu dokümanın amacı, HatırlaBeni uygulamasının fonksiyonel ve fonksiyonel olmayan gereksinimlerini tanımlamaktır. Doküman; geliştiriciler, tasarımcılar, test ekipleri ve proje paydaşları için yazılım geliştirme yaşam döngüsü boyunca referans niteliği taşımaktadır.

### 1.2 Kapsam

HatırlaBeni; kullanıcıların nostaljik ürünleri inceleyebilmesini, ürün arayabilmesini, filtreleyebilmesini, alışveriş sepetini yönetebilmesini, sipariş oluşturabilmesini ve kişisel hesaplarını yönetebilmesini sağlar. Yönetici (Admin) ise yönetim paneli üzerinden ürünleri, kategorileri, siparişleri ve kullanıcıları yönetebilir.

### 1.3 Tanımlar

| Terim            | Açıklama                                                         |
| ---------------- | ---------------------------------------------------------------- |
| Kullanıcı        | Sisteme kayıt olmuş ve ürün satın alabilen müşteri.              |
| Misafir          | Hesap oluşturmadan ürünleri inceleyebilen ziyaretçi.             |
| Yönetici (Admin) | Platformun yönetiminden sorumlu kullanıcı.                       |
| Ürün             | Satışa sunulan nostaljik ürün.                                   |
| Kategori         | Benzer özelliklere sahip ürünlerin gruplandırıldığı bölüm.       |
| Sepet            | Kullanıcının satın almak üzere seçtiği ürünlerin geçici listesi. |
| Sipariş          | Kullanıcının satın alma işlemi sonucunda oluşturduğu kayıt.      |

---

# 2. Ürüne Genel Bakış

## 2.1 Ürün Tanımı

HatırlaBeni, farklı dönemlerden ilham alan nostaljik ürünlerin satışına odaklanan çevrim içi bir alışveriş platformudur. Uygulama, modern bir e-ticaret deneyimi sunarken kullanıcıların geçmişe dair güzel anılarını canlandırmayı hedeflemektedir.

## 2.2 Kullanıcı Rolleri

### Misafir

Misafir kullanıcı aşağıdaki işlemleri gerçekleştirebilir:

* Ürünleri görüntüleyebilir.
* Ürün arayabilir.
* Ürünleri kategoriye göre filtreleyebilir.
* Ürün detaylarını görüntüleyebilir.
* Hesap oluşturabilir.
* Giriş yapabilir.

### Kullanıcı

Kayıtlı kullanıcı aşağıdaki işlemleri gerçekleştirebilir:

* Misafir kullanıcının yapabildiği tüm işlemleri gerçekleştirebilir.
* Profil bilgilerini yönetebilir.
* Ürünleri alışveriş sepetine ekleyebilir.
* Ürünleri alışveriş sepetinden çıkarabilir.
* Sipariş oluşturabilir.
* Sipariş geçmişini görüntüleyebilir.
* Teslimat adreslerini yönetebilir.
* Ürünleri favorilerine ekleyebilir.

### Yönetici (Admin)

Yönetici aşağıdaki işlemleri gerçekleştirebilir:

* Ürünleri yönetebilir.
* Kategorileri yönetebilir.
* Siparişleri yönetebilir.
* Kullanıcıları yönetebilir.
* Sistem istatistiklerini görüntüleyebilir.

---

# 3. Fonksiyonel Gereksinimler

## Kimlik Doğrulama

* Kullanıcılar sisteme kayıt olabilmelidir.
* Kullanıcılar giriş yapabilmelidir.
* Kullanıcılar güvenli bir şekilde çıkış yapabilmelidir.
* Kullanıcılar şifrelerini sıfırlayabilmelidir.

## Ürün Yönetimi

* Kullanıcılar ürünleri görüntüleyebilmelidir.
* Kullanıcılar ürün arayabilmelidir.
* Kullanıcılar ürünleri filtreleyebilmelidir.
* Kullanıcılar ürün detaylarını görüntüleyebilmelidir.

## Alışveriş Sepeti

* Kullanıcılar ürünleri sepete ekleyebilmelidir.
* Kullanıcılar sepetteki ürün miktarını güncelleyebilmelidir.
* Kullanıcılar ürünleri sepetten kaldırabilmelidir.

## Sipariş Yönetimi

* Kullanıcılar sipariş oluşturabilmelidir.
* Kullanıcılar sipariş geçmişini görüntüleyebilmelidir.
* Kullanıcılar sipariş detaylarını görüntüleyebilmelidir.

## Yönetim

* Yöneticiler yeni ürün ekleyebilmelidir.
* Yöneticiler ürün bilgilerini güncelleyebilmelidir.
* Yöneticiler ürünleri silebilmelidir.
* Yöneticiler kategorileri yönetebilmelidir.
* Yöneticiler müşteri siparişlerini yönetebilmelidir.

---

# 4. Fonksiyonel Olmayan Gereksinimler

## Performans

* Uygulama sayfaları hızlı yüklenmelidir.
* Ürün arama işlemleri kabul edilebilir bir yanıt süresi içerisinde sonuç vermelidir.

## Güvenlik

* Kullanıcı şifreleri şifrelenmiş olarak saklanmalıdır.
* Kimlik doğrulama işlemleri JWT kullanılarak gerçekleştirilmelidir.
* Rol tabanlı yetkilendirme uygulanmalıdır.

## Kullanılabilirlik

* Arayüz mobil cihazlar dahil tüm ekran boyutlarına uyumlu (responsive) olmalıdır.
* Uygulama kolay gezilebilir ve kullanıcı dostu olmalıdır.
* Alışveriş süreci basit, anlaşılır ve sezgisel olmalıdır.

## Güvenilirlik

* Uygulama beklenmeyen hataları kontrollü şekilde yönetebilmelidir.
* Veri bütünlüğü her zaman korunmalıdır.

## Bakım Kolaylığı

* Uygulama katmanlı mimari prensiplerine uygun geliştirilmelidir.
* Kaynak kod temiz kod (Clean Code) prensiplerine uygun olmalıdır.
* Proje Git kullanılarak sürüm kontrolü altında geliştirilmelidir.

---

# 5. Kapsam Dışı Özellikler

İlk sürümde aşağıdaki özellikler yer almayacaktır:

* Mobil uygulama
* Çoklu dil desteği
* Çoklu para birimi desteği
* Sadakat ve ödül sistemi
* Yapay zekâ destekli ürün önerileri
* Üçüncü taraf satıcıların ürün satabileceği pazar yeri (Marketplace)
* Dijital ürün satışı
* Nostaljik bilgisayar oyunları
