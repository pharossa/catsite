from http.server import SimpleHTTPRequestHandler, HTTPServer
import datetime
import urllib.parse
from database import save_message

class RequestHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Zaman damgası ve IP adresini dosyaya yaz
        with open("access_log.txt", "a", encoding="utf-8") as log_file:
            log_file.write(f"{datetime.datetime.now()} - {self.client_address[0]} - {self.path}\n")
        # Ayrıca konsola da yaz (opsiyonel)
        print(f"{datetime.datetime.now()} - {self.client_address[0]} - {self.path}")
    
    def do_POST(self):
        if self.path == '/submit-form':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            form_data = urllib.parse.parse_qs(post_data)
            
            # Form verilerini al
            name = form_data.get('name', [''])[0].strip()
            email = form_data.get('email', [''])[0].strip()
            subject = form_data.get('subject', [''])[0].strip()
            message = form_data.get('message', [''])[0].strip()
            ip_address = self.client_address[0]
            
            # Veritabanına kaydet
            if name and email and message:  # Gerekli alanlar dolu mu kontrol et
                try:
                    save_message(name, email, subject, message, ip_address)
                    # Başarılı yanıt dön ve teşekkürler sayfasına yönlendir
                    self.send_response(303)
                    self.send_header('Location', '/tesekkurler.html')
                    self.end_headers()
                    return
                except Exception as e:
                    print(f"Hata oluştu: {e}")
            
            # Hata durumunda veya eksik bilgi varsa hata sayfasına yönlendir
            self.send_response(303)
            self.send_header('Location', '/hata.html')
            self.end_headers()
        else:
            self.send_error(404, "Sayfa bulunamadı")

if __name__ == '__main__':
    PORT = 8000
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f"Sunucu {PORT} portunda başlatıldı. Çıkmak için Ctrl+C")
    print("Ziyaretçi bilgileri 'access_log.txt' dosyasına kaydedilecek.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nSunucu kapatılıyor...")
        httpd.server_close()
