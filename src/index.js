import fs from 'fs';
import path from 'path';
import levenshtein from 'fast-levenshtein';
import callOpenApi from './ncp/openapi/api/callApi';

const dataPath = path.resolve('data');
const sampleFileNames = [
  'lost-124kbps.mp3',
  'tajja-124kbps.mp3',
  'tajja-320kbps.mp3',
  'pirate-124kbps.mp3',
  'pirate-320kbps.mp3',
];
const sampleFiles = sampleFileNames
  .map(sampleFileName => fs.createReadStream(
    path.resolve(dataPath, sampleFileName),
  ));

const scriptPath = path.resolve(dataPath, 'scripts');
const scriptFileNames = [
  'lost.txt',
  'tajja.txt',
  'tajja.txt',
  'pirate.txt',
  'pirate.txt',
];
const scriptFiles = scriptFileNames
  .map(scriptFileName => String(fs.readFileSync(path.resolve(scriptPath, scriptFileName))));

sampleFiles.forEach(async (sampleFile, idx) => {
  const { text } = await callOpenApi(
    'POST',
    '/recog/v1/stt?lang=Kor',
    sampleFile,
  );
  const originalScript = scriptFiles[idx];
  console.log(`---- ${sampleFileNames[idx]} ----`);
  console.log('[original script]');
  console.log(originalScript);
  console.log('[Clova recognition result]');
  console.log(text);

  const distance = levenshtein.get(originalScript, text);
  const similarity = (originalScript.length - distance) / originalScript.length;
  const roundedSimilarity = Math.round(similarity * 10000) / 10000;

  console.log(`Similarity(distance): ${roundedSimilarity * 100}%`);
});
