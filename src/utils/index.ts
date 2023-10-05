export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const CalculatorTime = (time: any) => {
  let minute = Math.floor(time / 60)
  let second = time % 60

  console.log(
    `${Math.floor(minute)}:${second.toString().padStart(2, '0')} Phút`,
  )
}

export function objectToFormData(obj: any) {
  const formData = new FormData()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const valueIsFile = value instanceof File

      const isArrayData = Array.isArray(value)
      const initialValue = typeof value === 'number' ? Number(value) : ''

      if (isArrayData) {
        const isFile = value.some(item => item instanceof File)
        if (isFile) {
          Array.prototype.forEach.call(value, item => {
            formData.append(key, item)
          })
        } else {
          formData.append(key, value ? JSON.stringify(value) : '')
        }
      } else {
        if (typeof value === 'object' && !isArrayData && !valueIsFile) {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value || initialValue)
        }
      }
    }
  }

  return formData
}

export const convertTypeQuestion = (data: any) => {
  const formatData = data.map((item: any) => {
    if (item.type === 0) {
      return {
        ...item,
        type: 'Quy tắc ứng xử',
      }
    } else {
      return {
        ...item,
        type: 'Nghiệp vụ',
      }
    }
  })
  return formatData
}

import {getDocument} from 'pdfjs-dist';
export const generatePdfThumbnail = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event: any) {
      getDocument(event.target.result).promise.then(function (pdf) {
        pdf.getPage(1).then(function (page) {
          var viewport = page.getViewport({ scale: 1 });
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');

          if (context) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;
  
            page.render({
              canvasContext: context,
              viewport: viewport
            }).promise.then(function () {
              resolve(canvas.toDataURL());
            });
          } else {
            reject(new Error('Không thể lấy được context của canvas.'));
          }
        });
      });
    };
    reader.readAsArrayBuffer(file);
  });
};

export const generateVideoThumbnail = (file: any) => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = url;
    video.onloadedmetadata = function() {
      video.currentTime = 100;
    };
    video.onseeked = function() {
      const canvas = document.createElement('canvas');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Unable to get canvas context'));
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnail = canvas.toDataURL('image/jpeg');
      resolve(thumbnail);
    };
  });
};