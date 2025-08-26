# MultiConvert

**MultiConvert** on veebipõhine mitme konverteri platvorm, mis võimaldab kasutajatel teisendada erinevaid faile erinevatesse formaatidesse.  

Hetkel toetab see:

- DOCX → PDF

Tulevikus plaanis lisada:

- MP4 → MP3
- PNG/JPG → WEBP
- Teised populaarsemad failiformaadid

---

## Funktsioonid

- Üks API, mitu konverterit
- Lihtne front-end (React + TypeScript) failide üleslaadimiseks
- Node.js backend kutsub erinevaid konvertereid (hetkel Python DOCX → PDF)
- Töötav Windows, Linux ja macOS serverites

---

## Projekti struktuur

multi-convert/

├── backend/

│ ├── converters/ # Kõik konverterite skriptid

│ │ └── docx_to_pdf.py

│ ├── temp/ # Ajutised failid (DOCX ja PDF)

│ ├── server.ts # Express API

│ ├── package.json

│ └── tsconfig.json

│

├── frontend/

│ ├── src/

│ │ ├── components/

│ │ │ └── UploadForm.tsx

│ │ └── App.tsx

│ ├── package.json

│ └── tsconfig.json

│

└── README.md


---

### Tuleviku plaan

1. Lisada rohkem konvertereid `backend/converters` kausta.  
2. Luua universaalne API, mis otsustab konversiooni tüübi faili tüübi või valiku järgi.  
3. Täiustada front-endi, et näidata erinevaid konversiooni võimalusi.  
4. Lisada batch konvertimise ja logimise funktsionaalsus.  