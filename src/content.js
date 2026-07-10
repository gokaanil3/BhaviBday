// ============================================
//  EDIT THIS FILE TO CUSTOMIZE YOUR WEBSITE
// ============================================

// Put your images in public/assets/ folder
// Use paths like: '/assets/your-image.jpg'
export const SITE_CONTENT = {
  // Change password here
  password: 'pandhipilla',
  
  // Her name
  herName: 'Bujji',
  
  // Website title (shown in header)
  siteTitle: 'A Special Day For You 💖',
  
  // All website content sections
  sections: {
    // Hero section - first thing they see
    hero: {
      title: 'Happy Birthday, Bujji konda! 🎂',
      subtitle: 'Today is all about you...',
      message: 'Every moment with you is a gift. and every day with you is a blessing. I hope this Bond dosent break no matter what. I love you so much and I will always be there for you. thanks for bearing me  so far and making me realise that I you are with me in every lil things in my life. Happy Birthday My Love',
      image: '/assets/hero.jpg', // Replace with your image path
    },
    
    // Reasons why you love her
    reasons: {
      title: 'Answer To Your Question 💕',
      // Add/remove/edit reasons here
      items: [
        { emoji: '✨', text: 'Aduguthavu ga appudu alslu enduku and ela love chasanu anni' },
        { emoji: '🌟', text: 'Actually nenu manam first time matladinapudu gc lo normal ga matladudam anukunaa' },
        { emoji: '💫', text: 'But Idk how and why aa connection intha manchi beautiful bond laga marindhi' },
        { emoji: '🌙', text: 'And then the care you showed on me and those nicknames and how real you were with me made me fell for you' },
        { emoji: '💝', text: 'Itha First Sai mama ke chapa and Anu mama kee kuda chapa that i think i fell for you' },
        { emoji: '🌈', text: 'And then it came near you hehehe' },
      ],
    },
    
    // Photo gallery
    gallery: {
      title: 'What You Did To Me 📸',
      subtitle: 'Click to enlarge',
      // Add/remove/edit gallery images here
      images: [
        { src: '/assets/love1.jpg', caption: 'The day my heart found home' },
        { src: '/assets/love2.jpg', caption: 'Laughter that heals everything' },
        { src: '/assets/love3.jpg', caption: 'Smile That Melts Me' },
        { src: '/assets/memory1.png', caption: 'Made Me Yours' },
        { src: '/assets/memory2.png', caption: 'Gave Me The Care And Love I Needed' },
        { src: '/assets/memory3.png', caption: 'Hehe And You Know Nenu Apudu Adigina Okay Antavu UK What I Mean HEHEHEHE!' },
      ],
    },
    
    // Love letter
    letter: {
      title: 'A Letter For You 💌',
      // Edit your letter paragraphs here
      paragraphs: [
        'My Dearest,',
        'On this special day, I want you to know how deeply you are loved. You are not just my partner — you are my best friend, my confidante, and my greatest adventure.',
        'Every sunrise reminds me of your warmth. Every sunset brings back memories of us. And every heartbeat whispers your name.',
        'Thank you for being you. Thank you for loving me. Thank you for making life beautiful.',
        'Here is to many more birthdays, countless adventures, and an eternity of love.',
        'Forever yours,',
      ],
      signature: 'With all my heart 💖', // Your signature
    },
    
    // Wishes for her
    wishes: {
      title: 'My Wishes For You 🎁',
      // Add/remove/edit wishes here
      items: [
        { emoji: '🌟', text: 'May all your dreams come true' },
        { emoji: '💖', text: 'May you be surrounded by love always' },
        { emoji: '🌈', text: 'May every day bring you joy' },
        { emoji: '🍀', text: 'May luck follow you everywhere' },
        { emoji: '🌺', text: 'May your heart stay forever young' },
        { emoji: '💫', text: 'May we create magic together' },
      ],
    },
    
    // Footer text
    footer: [
      'Made with infinite love, just for you.',
      '✨ Happy Birthday to my favorite person ✨',
    ],
  },
  
  // Music settings
  music: {
    // Put your song in public/audio/ folder and update this path
    backgroundMusicUrl: '/audio/romantic-song.mp3',
    enabledByDefault: true,
  },
};
