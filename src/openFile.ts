import * as fs from 'fs';

export function openFile(filename: string, mode, todo: (fd: number) => void): void {
    let fd = fs.openSync(filename, mode);
    try {
        todo(fd)
    } finally {
        fs.closeSync(fd)
    }
}