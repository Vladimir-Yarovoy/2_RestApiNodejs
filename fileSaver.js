import { v4 as uuidv4 } from 'uuid';
import path from 'path';

class FileSaver {
    saveFile(file) {
        const fileName = uuidv4() + '.png';
        const filePath = path.resolve('static', fileName);
        file.mv(filePath);
        return fileName;
    }
}

export default new FileSaver();