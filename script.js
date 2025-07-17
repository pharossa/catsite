// Kedi temalı interaktif özellikler
const meowSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-cat-meow-1191.mp3');
const catImages = [
    'https://r.resimlink.com/k4Mylq9w.png',
    'https://r.resimlink.com/I_uNHA-aKh.png',
    'https://r.resimlink.com/XcA4La.png',
    'https://r.resimlink.com/IM2nJzKk7s.png'
];

// Rastgele boyut üretme fonksiyonu
function getRandomSize() {
    const width = 300 + Math.floor(Math.random() * 100); // 300-400 arası rastgele genişlik
    const height = 200 + Math.floor(Math.random() * 100); // 200-300 arası rastgele yükseklik
    return { width, height };
}

// Mobil menüyü açıp kapatma
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// Menüye tıklandığında miyav sesi çal
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    playMeow();
});

// Menü öğelerine tıklandığında menüyü kapat ve miyav sesi çal
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        playMeow();
    });
});

// Miyav sesi çalma fonksiyonu
function playMeow() {
    meowSound.currentTime = 0;
    meowSound.play().catch(e => console.log("Ses çalınamadı:", e));
}

// Sayfa başlığını sürekli değiştiren efekt
document.addEventListener('DOMContentLoaded', () => {
    const originalTitle = document.title;
    let isOriginal = true;
    
    setInterval(() => {
        document.title = isOriginal ? '😺 Miyav! Bizi Ziyaret Ettiğiniz İçin Teşekkürler!' : originalTitle;
        isOriginal = !isOriginal;
    }, 3000);
    
    // Rastgele kedi resimleri yükle
    loadRandomCatImages();
    
    // Kedi oyunu için event listener'ları ekle
    setupCatGame();
});

// Rastgele kedi resimleri yükle
function loadRandomCatImages() {
    const catImages = document.querySelectorAll('.gallery-item img');
    catImages.forEach(img => {
        // Artık rastgele kedi resmi yüklemiyoruz, sadece mevcut resimlere tıklama özelliği ekliyoruz
        img.alt = 'Sevimli Kedi';
        
        // Resme tıklandığında miyav sesi çal
        img.addEventListener('click', (e) => {
            e.target.classList.add('cat-clicked');
            playMeow();
            setTimeout(() => e.target.classList.remove('cat-clicked'), 300);
        });
    });
}

// Kedi oyunu için gerekli ayarlar
function setupCatGame() {
    const gameArea = document.createElement('div');
    gameArea.style.position = 'fixed';
    gameArea.style.bottom = '20px';
    gameArea.style.right = '20px';
    gameArea.style.zIndex = '1000';
    
    const gameButton = document.createElement('button');
    gameButton.textContent = '🐱 Oyna';
    gameButton.style.padding = '10px 20px';
    gameButton.style.border = 'none';
    gameButton.style.borderRadius = '20px';
    gameButton.style.background = 'linear-gradient(45deg, #ff9a8b, #ff6b6b)';
    gameButton.style.color = 'white';
    gameButton.style.cursor = 'pointer';
    gameButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    gameButton.style.transition = 'transform 0.3s';
    
    gameButton.addEventListener('mouseover', () => {
        gameButton.style.transform = 'scale(1.05)';
    });
    
    gameButton.addEventListener('mouseout', () => {
        gameButton.style.transform = 'scale(1)';
    });
    
    gameButton.addEventListener('click', startCatGame);
    
    gameArea.appendChild(gameButton);
    document.body.appendChild(gameArea);
}

// Kedi yakalama oyunu
function startCatGame() {
    // Eğer zaten bir oyun varsa iptal et
    const existingGame = document.querySelector('.cat-game');
    if (existingGame) {
        existingGame.remove();
        return;
    }
    
    // Oyun alanını oluştur
    const game = document.createElement('div');
    game.className = 'cat-game';
    game.style.position = 'fixed';
    game.style.top = '0';
    game.style.left = '0';
    game.style.width = '100%';
    game.style.height = '100%';
    game.style.backgroundColor = 'rgba(0,0,0,0.8)';
    game.style.display = 'flex';
    game.style.flexDirection = 'column';
    game.style.justifyContent = 'center';
    game.style.alignItems = 'center';
    game.style.zIndex = '2000';
    
    // Oyun başlığı
    const title = document.createElement('h2');
    title.textContent = '🐱 Kedi Yakalama Oyunu 🐱';
    title.style.color = 'white';
    title.style.marginBottom = '30px';
    title.style.textAlign = 'center';
    
    // Skor tablosu
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.textContent = 'Skor: 0';
    scoreDisplay.style.color = 'white';
    scoreDisplay.style.fontSize = '24px';
    scoreDisplay.style.marginBottom = '20px';
    
    // Oyun alanı
    const gameBoard = document.createElement('div');
    gameBoard.style.width = '80%';
    gameBoard.style.height = '60vh';
    gameBoard.style.backgroundColor = 'rgba(255,255,255,0.1)';
    gameBoard.style.borderRadius = '15px';
    gameBoard.style.position = 'relative';
    gameBoard.style.overflow = 'hidden';
    
    // Kapatma butonu
    const closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '10px';
    
    closeButton.addEventListener('click', () => {
        game.remove();
        clearInterval(gameInterval);
    });
    
    // Oyun alanına öğeleri ekle
    game.appendChild(title);
    game.appendChild(scoreDisplay);
    game.appendChild(gameBoard);
    game.appendChild(closeButton);
    document.body.appendChild(game);
    
    // Oyun değişkenleri
    let score = 0;
    let gameInterval;
    
    // Oyun döngüsü
    function createCat() {
        const cat = document.createElement('div');
        cat.textContent = '🐱';
        cat.style.position = 'absolute';
        cat.style.fontSize = '40px';
        cat.style.cursor = 'pointer';
        cat.style.userSelect = 'none';
        
        // Rastgele pozisyon
        const maxX = gameBoard.offsetWidth - 40;
        const maxY = gameBoard.offsetHeight - 40;
        const posX = Math.random() * maxX;
        const posY = Math.random() * maxY;
        
        cat.style.left = `${posX}px`;
        cat.style.top = `${posY}px`;
        
        // Kediye tıklandığında
        cat.addEventListener('click', () => {
            playMeow();
            score += 10;
            scoreDisplay.textContent = `Skor: ${score}`;
            cat.remove();
            
            // Patlama efekti
            const explosion = document.createElement('div');
            explosion.textContent = '💥';
            explosion.style.position = 'absolute';
            explosion.style.left = `${posX}px`;
            explosion.style.top = `${posY}px`;
            explosion.style.fontSize = '30px';
            explosion.style.animation = 'fadeOut 0.5s forwards';
            gameBoard.appendChild(explosion);
            
            setTimeout(() => explosion.remove(), 500);
        });
        
        // Kediyi oyun alanına ekle
        gameBoard.appendChild(cat);
        
        // 1-3 saniye sonra kedi kaybolsun
        setTimeout(() => {
            if (cat.parentNode === gameBoard) {
                cat.style.transition = 'opacity 0.5s';
                cat.style.opacity = '0';
                setTimeout(() => cat.remove(), 500);
            }
        }, 1000 + Math.random() * 2000);
    }
    
    // Her 0.5-1.5 saniyede bir yeni kedi oluştur
    gameInterval = setInterval(createCat, 500);
    
    // Oyun alanına tıklandığında da kedi oluştur
    gameBoard.addEventListener('click', (e) => {
        if (e.target === gameBoard) {
            createCat();
        }
    });
}

// Sayfa kaydırıldığında header'ın görünümünü değiştirme ve kedi patisi efekti
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
    
    // Rastgele kedi patisi efekti
    if (Math.random() > 0.99) { // %1 şansla çalış
        createPawPrint();
    }
});

// Sayfada rastgele kedi patisi bırakma
function createPawPrint() {
    const paw = document.createElement('div');
    paw.textContent = '🐾';
    paw.style.position = 'fixed';
    paw.style.fontSize = '24px';
    paw.style.opacity = '0.7';
    paw.style.pointerEvents = 'none';
    paw.style.zIndex = '9999';
    
    // Rastgele konum
    const posX = Math.random() * window.innerWidth;
    const posY = window.scrollY + Math.random() * window.innerHeight;
    
    paw.style.left = `${posX}px`;
    paw.style.top = `${posY}px`;
    
    // Rastgele döndürme
    const rotation = (Math.random() * 60) - 30; // -30 ile 30 derece arası
    paw.style.transform = `rotate(${rotation}deg)`;
    
    document.body.appendChild(paw);
    
    // 3-10 saniye sonra yok ol
    setTimeout(() => {
        paw.style.transition = 'opacity 2s';
        paw.style.opacity = '0';
        setTimeout(() => paw.remove(), 2000);
    }, 3000 + Math.random() * 7000);
}

// Form gönderimi
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form verilerini al
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Burada form verilerini işleyebilir veya bir API'ye gönderebilirsiniz
        console.log('Form gönderildi:', { name, email, subject, message });
        
        // Kullanıcıya şirin bir geri bildirim göster
        const catResponses = [
            'Miyav! Mesajın bize ulaştı! 😺',
            'Patilerinle yazdığın mesajı aldık! 🐾',
            'Teşekkür ederiz! En kısa sürede döneceğiz. 😽',
            'Miyav! Mesajın için teşekkürler! 🐱',
            'Patilerinle yazdığın için teşekkürler! 🐈'
        ];
        
        const randomResponse = catResponses[Math.floor(Math.random() * catResponses.length)];
        
        // Özel bir uyarı kutusu oluştur
        const alertBox = document.createElement('div');
        alertBox.style.position = 'fixed';
        alertBox.style.top = '20px';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translateX(-50%)';
        alertBox.style.backgroundColor = '#4CAF50';
        alertBox.style.color = 'white';
        alertBox.style.padding = '15px 25px';
        alertBox.style.borderRadius = '30px';
        alertBox.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        alertBox.style.zIndex = '9999';
        alertBox.style.display = 'flex';
        alertBox.style.alignItems = 'center';
        alertBox.style.gap = '10px';
        
        const catIcon = document.createElement('span');
        catIcon.textContent = '😺';
        catIcon.style.fontSize = '24px';
        
        const messageText = document.createElement('span');
        messageText.textContent = randomResponse;
        
        alertBox.appendChild(catIcon);
        alertBox.appendChild(messageText);
        
        document.body.appendChild(alertBox);
        
        // 3 saniye sonra uyarıyı kaldır
        setTimeout(() => {
            alertBox.style.transition = 'opacity 0.5s';
            alertBox.style.opacity = '0';
            setTimeout(() => alertBox.remove(), 500);
        }, 3000);
        
        // Formu temizle
        contactForm.reset();
        
        // Miyav sesi çal
        playMeow();
    });
}

// Sayfa yüklendiğinde animasyonları başlat
window.addEventListener('load', () => {
    console.log('🐱 Kedi dünyasına hoş geldiniz!');
    
    // Sayfa yüklendiğinde yavaşça görünür hale getir
    document.body.style.opacity = '1';
    
    // Karşılama mesajı
    setTimeout(() => {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.textContent = '🐱 Kedi Dünyasına Hoş Geldiniz! 🐾';
        welcomeMsg.style.position = 'fixed';
        welcomeMsg.style.top = '20px';
        welcomeMsg.style.left = '50%';
        welcomeMsg.style.transform = 'translateX(-50%)';
        welcomeMsg.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        welcomeMsg.style.padding = '15px 30px';
        welcomeMsg.style.borderRadius = '30px';
        welcomeMsg.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        welcomeMsg.style.zIndex = '9999';
        welcomeMsg.style.fontWeight = 'bold';
        welcomeMsg.style.animation = 'slideDown 0.5s forwards';
        
        document.body.appendChild(welcomeMsg);
        
        // 3 saniye sonra kaybolsun
        setTimeout(() => {
            welcomeMsg.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => welcomeMsg.remove(), 500);
        }, 3000);
    }, 1000);
    
    // Rastgele kedi miyavlamaları
    setInterval(() => {
        if (Math.random() > 0.95) { // %5 şansla miyavla
            playMeow();
        }
    }, 30000); // Her 30 saniyede bir kontrol et
});

// Animasyonlar için CSS ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translate(-50%, -50px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .cat-clicked {
        animation: bounce 0.3s;
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Düzgün kaydırma (smooth scrolling) için
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Miyav sesi çal
            playMeow();
            
            // Kedi patisi efekti ekle
            const clickX = e.clientX;
            const clickY = e.clientY;
            createPawEffect(clickX, clickY);
            
            // Hedefe kaydır
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Header yüksekliği kadar yukarıdan boşluk bırak
                behavior: 'smooth'
            });
        }
    });
});

// Tıklama noktasında kedi patisi efekti oluştur
function createPawEffect(x, y) {
    const paw = document.createElement('div');
    paw.textContent = '🐾';
    paw.style.position = 'fixed';
    paw.style.left = `${x - 15}px`;
    paw.style.top = `${y - 15}px`;
    paw.style.fontSize = '30px';
    paw.style.pointerEvents = 'none';
    paw.style.zIndex = '9999';
    paw.style.animation = 'pawClick 0.8s forwards';
    
    document.body.appendChild(paw);
    
    // Animasyon bittikten sonra kaldır
    setTimeout(() => {
        paw.remove();
    }, 800);
}

// Pati animasyonu için CSS ekle
const pawStyle = document.createElement('style');
pawStyle.textContent = `
    @keyframes pawClick {
        0% { transform: scale(0.5) rotate(-20deg); opacity: 1; }
        50% { transform: scale(1.2) rotate(10deg); opacity: 0.8; }
        100% { transform: scale(0.8) rotate(0); opacity: 0; }
    }
`;
document.head.appendChild(pawStyle);

// Sayfa yüklendiğinde yavaşça görünür hale getir
document.body.style.opacity = '0';
setTimeout(() => {
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = '1';
    
    // Sayfa yüklendiğinde rastgele bir kedi resmi göster
    const catImages = document.querySelectorAll('img');
    catImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.transition = 'transform 0.3s';
            
            img.addEventListener('mouseover', () => {
                img.style.transform = 'scale(1.05)';
                img.style.cursor = 'pointer';
            });
            
            img.addEventListener('mouseout', () => {
                img.style.transform = 'scale(1)';
            });
            
            img.addEventListener('click', () => {
                playMeow();
                
                // Büyük resim göster
                const overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
                overlay.style.display = 'flex';
                overlay.style.justifyContent = 'center';
                overlay.style.alignItems = 'center';
                overlay.style.zIndex = '9999';
                overlay.style.cursor = 'pointer';
                
                const largeImg = document.createElement('img');
                largeImg.src = img.src;
                largeImg.style.maxWidth = '90%';
                largeImg.style.maxHeight = '90%';
                largeImg.style.borderRadius = '10px';
                largeImg.style.boxShadow = '0 0 30px rgba(255,255,255,0.2)';
                largeImg.style.animation = 'fadeIn 0.5s';
                
                overlay.appendChild(largeImg);
                document.body.appendChild(overlay);
                
                // Tıklandığında kapat
                overlay.addEventListener('click', () => {
                    overlay.style.animation = 'fadeOut 0.5s';
                    setTimeout(() => overlay.remove(), 500);
                });
            });
        });
    });
}, 100);

// Yetenek çubuklarını animasyonlu gösterme
const skillsSection = document.querySelector('.skills');
const progressBars = document.querySelectorAll('.progress-bar');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.style.width;
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.width = value;
        }, 100);
    });
}

function hideProgress() {
    progressBars.forEach(progressBar => {
        progressBar.style.width = '0';
    });
}

// Sayfa yüklendiğinde yetenek çubuklarını göster
window.addEventListener('load', () => {
    // Sayfa yüklendiğinde yetenek bölümü görünürse çalıştır
    if (isInViewport(skillsSection)) {
        showProgress();
    }
});

// Kaydırma sırasında yetenek bölümü görünür olduğunda animasyonu başlat
window.addEventListener('scroll', () => {
    if (isInViewport(skillsSection)) {
        showProgress();
    } else {
        hideProgress();
    }
});

// Bir öğenin görünür olup olmadığını kontrol etme
function isInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}
