import fs from 'fs';
import path from 'path';
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
  console.log(`---- ${sampleFileNames[idx]} ----`);
  console.log('[original script]');
  console.log(scriptFiles[idx]);
  console.log('[Clova recognition result]');
  console.log(text);
});
