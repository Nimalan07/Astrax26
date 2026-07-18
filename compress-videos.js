const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, 'src', 'assets');

const videos = [
  'about-bg',
  'sponsers',
  'upcoming',
  'bg-video',
  'intro',
  'hero'
];

console.log('Starting video compression process...');

videos.forEach(name => {
  const mp4Input = path.join(assetsDir, `${name}.mp4`);
  const webmInput = path.join(assetsDir, `${name}.webm`);
  
  if (!fs.existsSync(mp4Input)) {
    console.warn(`File not found: ${mp4Input}, skipping.`);
    return;
  }
  
  const mp4Temp = path.join(assetsDir, `${name}_temp.mp4`);
  const webmTemp = path.join(assetsDir, `${name}_temp.webm`);
  
  console.log(`\n--------------------------------------------`);
  console.log(`Compressing ${name}...`);
  
  // 1. Compress MP4
  console.log(`Compressing MP4: ${name}.mp4`);
  try {
    execSync(`ffmpeg -y -i "${mp4Input}" -vcodec libx264 -crf 30 -preset fast -an -threads 0 "${mp4Temp}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error compressing MP4 for ${name}:`, err);
    return;
  }
  
  // 2. Compress WebM (using the compressed MP4 as input for speed)
  console.log(`Compressing WebM: ${name}.webm`);
  try {
    execSync(`ffmpeg -y -i "${mp4Temp}" -c:v libvpx-vp9 -crf 40 -b:v 0 -an -deadline good -cpu-used 4 -row-mt 1 -threads 0 "${webmTemp}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error compressing WebM for ${name}:`, err);
    return;
  }
  
  // Replace original files with compressed versions
  try {
    fs.unlinkSync(mp4Input);
    fs.renameSync(mp4Temp, mp4Input);
    console.log(`Successfully replaced ${name}.mp4`);
  } catch (err) {
    console.error(`Error replacing ${name}.mp4:`, err);
  }
  
  try {
    if (fs.existsSync(webmInput)) {
      fs.unlinkSync(webmInput);
    }
    fs.renameSync(webmTemp, webmInput);
    console.log(`Successfully replaced ${name}.webm`);
  } catch (err) {
    console.error(`Error replacing ${name}.webm:`, err);
  }
});

// Clean up test files if any
const testMp4 = path.join(assetsDir, 'about-bg_test.mp4');
const testWebm = path.join(assetsDir, 'about-bg_test.webm');
if (fs.existsSync(testMp4)) fs.unlinkSync(testMp4);
if (fs.existsSync(testWebm)) fs.unlinkSync(testWebm);

console.log('\nCompression process completed successfully!');
