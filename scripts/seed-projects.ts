/**
 * Seed Script — Firestore'a portfolio projelerini yükler.
 * Çalıştırmak için: npx ts-node --project tsconfig.seed.json scripts/seed-projects.ts
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6_5Zg3A_-niGtAYGSPKhkQlABg01ZDjM",
  authDomain: "portfolyo-259f9.firebaseapp.com",
  projectId: "portfolyo-259f9",
  storageBucket: "portfolyo-259f9.appspot.com",
  messagingSenderId: "484107017517",
  appId: "1:484107017517:web:eecf51b40908bb36d107a4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const projects = [
//   {
//     id: 1,
//     image: "/images/ek.png",
//     title: "Profesyonel Kuaför Sitesi + Admin Panel",
//     description:
//       "Kuaför salonları için müşteri kazandıran, modern ve mobil uyumlu bir web sitesi geliştirdik. Online randevu sistemi ve güçlü admin panel sayesinde işletme sahipleri tüm içerikleri kolayca yönetebilir.",
//     tags: ["Next.js", "Firebase", "Web"],
//     category: "web",
//   },
//   {
//     id: 2,
//     image: "/images/dı.png",
//     title: "Yapay Zeka Destekli Diş Hastalıkları Tespit Uygulaması",
//     description:
//       "Ağız içi görüntülerden diş hastalıklarını tespit etmek için geliştirilmiş bir mobil uygulamadır. Kullanıcılar, ağız içi fotoğraflarını uygulamaya yükleyerek, yapay zeka desteğiyle 5 farklı hastalık sınıfından birine dair olası teşhis alabilir.",
//     tags: ["Flutter", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 3,
//     image: "/images/rkm.png",
//     title: "Eğlenceli Sayı Oyunu: Rakamio",
//     description:
//       "Uygulama içerisinde seviye sistemi, puanlama yapısı ve ilerleme takibi bulunmaktadır. Modern arayüz tasarımı ve akıcı performans ile kullanıcıların keyifli vakit geçirmesi hedeflenmiştir.",
//     tags: ["Dart", "Flutter", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 4,
//     image: "/images/kp.jpeg",
//     title: "Kampüste Paylaş",
//     description:
//       "Kampüste Paylaş, üniversite öğrencileri için özel olarak geliştirilmiş bir mobil uygulamadır. Amacı, öğrencilerin kampüs hayatını daha sosyal, verimli ve keyifli hale getirmektir.",
//     tags: ["Flutter", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 5,
//     image: "/images/yt.png",
//     title: "Yurt İçi İletişim ve Takip Mobil Uygulaması",
//     description:
//       "Yurttaş, öğrenci yurtlarında kalan bireylerin hem birbiriyle iletişim kurmasını hem de günlük yaşamlarını organize etmesini kolaylaştırmak için geliştirilmiş bir mobil uygulamadır.",
//     tags: ["React Native", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 6,
//     image: "/images/kk.png",
//     title: "Mahalle Dayanışma ve Yardımlaşma Uygulaması",
//     description:
//       "Kapı Komşum, mahalle sakinlerinin birbirine yardım edebileceği, iletişim kurabileceği ve topluluk etkinliklerine katılabileceği kapsamlı bir mobil uygulamadır.",
//     tags: ["React Native", "Firebase", "Node.js"],
//     category: "mobile",
//   },
//   {
//     id: 7,
//     image: "/images/motf.png",
//     title: "Görev Takibi ve Mini Oyunlarla Gelişim Uygulaması",
//     description:
//       "Kullanıcılar kendi görevlerini tanımlayıp tamamlarken XP kazanabilir, seviyelerini artırabilir, arkadaşlarıyla etkileşime geçebilir ve mini oyunlarla gelişimlerini destekleyebilir.",
//     tags: ["React Native", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 8,
//     image: "/images/rh.jpeg",
//     title: "ReadHub - Kitap Severlerin Buluşma Noktası",
//     description:
//       "ReadHub, modern bir kitap takip ve topluluk uygulamasıdır. Kullanıcılar kitap arayabilir, okuma durumlarını takip edebilir, diğer okuyucularla spoilerli veya spoilersiz yorumlar paylaşabilir ve kişiselleştirilmiş kitap önerileri alabilir.",
//     tags: ["Flutter", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 9,
//     image: "/images/pg.jpeg",
//     title: "PingBox – Akıllı Mesajlama, Bildirim & Kişisel Asistan",
//     description:
//       "PingBox, kullanıcıların ileri tarihe mesaj planlayabildiği, bildirim alabileceği, sessiz saatler tanımlayabileceği, kullanıcı davranışı analizi ve AI destekli öneri sistemi sunan modern bir kişisel iletişim asistanıdır.",
//     tags: ["Flutter", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 10,
//     image: "/images/ww.jpeg",
//     title: "WardrobeWizard - Akıllı Gardırop",
//     description:
//       "WardrobeWizard, kullanıcıların gardıroplarını daha akıllı, düzenli ve verimli şekilde yönetmelerini sağlayan bir mobil uygulamadır.",
//     tags: ["Flutter", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 11,
//     image: "/images/hng.png",
//     title: "Hangisi? – Karar Verme ve Topluluk Oylama Uygulaması",
//     description:
//       "Hangisi?, kararsız kaldığınız konuları topluluğa sorabileceğiniz, oylama veya yorum sistemi ile fikir alabileceğiniz sosyal bir mobil uygulamadır.",
//     tags: ["React Native", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 12,
//     image: "/images/pz.png",
//     title: "Planzy – Etkinlik Oluşturma ve Sosyal Etkileşim Uygulaması",
//     description:
//       "Planzy, kullanıcıların etkinlik oluşturup katılabileceği, yorum yapabileceği ve etkinliklerin harita üzerinde gösterileceği kapsamlı bir sosyal etkinlik uygulamasıdır.",
//     tags: ["React Native", "Google Maps API", "Node.js"],
//     category: "mobile",
//   },
//   {
//     id: 13,
//     image: "/images/wtr.png",
//     title: "Water Reminder — Su İçme Hatırlatıcısı Uygulaması",
//     description:
//       "Bu proje, kullanıcıların su içme alışkanlıklarını takip etmelerini ve sağlıklı bir şekilde su tüketimini düzenlemelerini sağlayan bir mobil uygulamadır.",
//     tags: ["React Native", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 14,
//     image: "/images/wd.jpeg",
//     title: "WorkdayApp - Günlük Çalışma Takibi",
//     description:
//       "WorkdayApp, çalışanların günlük çalışma durumlarını, izinlerini, avanslarını ve maaş hesaplamalarını kolayca takip edebileceği bir mobil uygulamadır.",
//     tags: ["Flutter", "Firebase", "Android"],
//     category: "mobile",
//   },
//   {
//     id: 15,
//     image: "/images/mh.jpeg",
//     title: "MovieHub - Film Keyfinin Yeni Adresi",
//     description:
//       "MovieHub, popüler filmleri keşfetmenizi, detaylarını incelemenizi ve favorilerinizi yönetmenizi sağlayan modern ve kullanıcı dostu bir mobil uygulamadır.",
//     tags: ["Flutter", "Firebase", "ML Kit"],
//     category: "mobile",
//   },
//   {
//     id: 16,
//     image: "/images/ko.png",
//     title: "Kelime Oyunu Web Sitesi",
//     description:
//       "Bu proje, kullanıcıların seviye seçerek kelime oyunu oynayabileceği eğlenceli bir web platformudur.",
//     tags: ["Next.js", "TypeScript", "Web"],
//     category: "web",
//   },
//   {
//     id: 17,
//     image: "/images/trf.png",
//     title: "Tarif Web Sitesi",
//     description:
//       "Bu proje, kullanıcıların farklı yemek tariflerini keşfedebileceği, favorileyebileceği ve kendi tariflerini paylaşabileceği bir tarif platformudur.",
//     tags: ["React", "Node.js", "Web"],
//     category: "web",
//   },
//   {
//     id: 18,
//     image: "/images/flm.png",
//     title: "Film Öneri Sitesi",
//     description:
//       "Bu proje, kullanıcıların film keşfetmesini kolaylaştıran bir film öneri platformudur.",
//     tags: ["React", "REST API", "Web"],
//     category: "web",
//   },
//   {
//     id: 19,
//     image: "/images/tt.jpeg",
//     title: "TaskTeam – Takımlar için Görev & Proje Yönetim Sistemi",
//     description:
//       "TaskTeam, ekiplerin proje, görev ve personel yönetimini tek bir platform üzerinden kolayca yapabilmesi için geliştirilmiş tam entegre bir web uygulamasıdır.",
//     tags: ["Angular", ".Net", "PostgreSQL"],
//     category: "web",
//   },
//   {
//     id: 20,
//     image: "/images/cl.jpeg",
//     title: "CornLeafAI - Mısır Yaprağı Hastalık Tespit Uygulaması",
//     description:
//       "CornLeafAI, mısır yapraklarındaki hastalıkları tespit eden yapay zekâ destekli mobil uygulamadır.",
//     tags: ["Flutter", "TensorFlow Lite", "Firebase"],
//     category: "mobile",
//   },
// ];

async function seed() {
  console.log("🌱 Mevcut projeler siliniyor...");
  const existing = await getDocs(collection(db, "projects"));
  for (const doc of existing.docs) {
    await deleteDoc(doc.ref);
  }
  console.log(`✅ ${existing.size} eski kayıt silindi.`);

  console.log("📦 Yeni projeler yükleniyor...");
  // for (const project of projects) {
  //   await addDoc(collection(db, "projects"), {
  //     ...project,
  //     createdAt: new Date(),
  //   });
  //   console.log(`  ✓ "${project.title}" eklendi`);
  // }

  // console.log(`\n🎉 Seed tamamlandı! ${projects.length} proje Firestore'a yüklendi.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed hatası:", err);
  process.exit(1);
});
