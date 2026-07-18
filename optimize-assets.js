import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, 'src', 'assets');

console.log('Starting Asset Optimization Process...\n');

// Phase 1: Compress Images
const imageExtensions = ['.png', '.jpg', '.jpeg'];
const filesInAssets = fs.readdirSync(assetsDir);

const images = filesInAssets.filter(file => 
  imageExtensions.includes(path.extname(file).toLowerCase()) &&
  !file.endsWith('.webp')
);

console.log(`--- Step 1: Optimizing ${images.length} Images to WebP ---`);
images.forEach(imgFile => {
  const inputPath = path.join(assetsDir, imgFile);
  const ext = path.extname(imgFile);
  const baseName = path.basename(imgFile, ext);
  const outputPath = path.join(assetsDir, `${baseName}.webp`);

  console.log(`Converting ${imgFile} to WebP...`);
  try {
    execSync(`ffmpeg -y -i "${inputPath}" -q:v 75 "${outputPath}"`, { stdio: 'ignore' });
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const pct = Math.round((1 - (optimizedSize / originalSize)) * 100);
    console.log(`   ➔ Success: ${baseName}.webp (${pct}% smaller: ${(originalSize/1024/1024).toFixed(2)}MB -> ${(optimizedSize/1024/1024).toFixed(2)}MB)`);
  } catch (err) {
    console.error(`   ➔ Error converting ${imgFile}:`, err.message);
  }
});

// Phase 2: Compress Videos
const videoNames = ['about-bg', 'sponsers', 'upcoming', 'bg-video', 'intro', 'hero'];

console.log('\n--- Step 2: Optimizing Videos (720p + Faststart) ---');
videoNames.forEach(name => {
  const mp4Input = path.join(assetsDir, `${name}.mp4`);
  
  if (!fs.existsSync(mp4Input)) {
    console.warn(`Video file ${name}.mp4 not found, skipping.`);
    return;
  }

  const mp4Temp = path.join(assetsDir, `${name}_temp.mp4`);
  const webmTemp = path.join(assetsDir, `${name}_temp.webm`);
  const webmInput = path.join(assetsDir, `${name}.webm`);

  console.log(`Processing video: ${name}...`);

  // Compress MP4 (720p, CRF 28, faststart, strip audio)
  try {
    console.log(`   - Compressing MP4 fallback...`);
    execSync(`ffmpeg -y -i "${mp4Input}" -vf "scale=1280:-2" -vcodec libx264 -crf 28 -preset fast -an -movflags +faststart "${mp4Temp}"`, { stdio: 'ignore' });
  } catch (err) {
    console.error(`   ➔ MP4 compression failed for ${name}:`, err.message);
    return;
  }

  // Compress WebM (VP9, CRF 35, strip audio)
  try {
    console.log(`   - Compressing WebM stream...`);
    execSync(`ffmpeg -y -i "${mp4Temp}" -c:v libvpx-vp9 -crf 35 -b:v 0 -an -deadline good -cpu-used 4 -row-mt 1 -threads 0 "${webmTemp}"`, { stdio: 'ignore' });
  } catch (err) {
    console.error(`   ➔ WebM compression failed for ${name}:`, err.message);
    return;
  }

  // Replace original files
  try {
    fs.unlinkSync(mp4Input);
    fs.renameSync(mp4Temp, mp4Input);
    
    if (fs.existsSync(webmInput)) {
      fs.unlinkSync(webmInput);
    }
    fs.renameSync(webmTemp, webmInput);

    console.log(`   ➔ Success: ${name}.mp4 and ${name}.webm optimized successfully.`);
  } catch (err) {
    console.error(`   ➔ Error updating video files for ${name}:`, err.message);
  }
});

console.log('\nAsset optimization process complete!');
