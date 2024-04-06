import BoxParser from '../../src/streaming/utils/BoxParser';

const expect = require('chai').expect;

const context = {};
const boxParser = BoxParser(context).getInstance();

const ftypCompleted = [0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x01, 0x69, 0x73, 0x6f, 0x6d];
const ftypIncompleted = [0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x01, 0x69, 0x73, 0x6f];

const initSegmentCompleted = [
    0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x35, 0x00, 0x00, 0x00, 0x01, 0x61, 0x76, 0x63, 0x31, 0x69, 0x73, 0x6f, 0x35,
    0x64, 0x61, 0x73, 0x68, 0x00, 0x00, 0x00, 0x08, 0x66, 0x72, 0x65, 0x65, 0x00, 0x00, 0x00, 0x60, 0x66, 0x72, 0x65, 0x65, 0x49, 0x73, 0x6f, 0x4d,
    0x65, 0x64, 0x69, 0x61, 0x20, 0x46, 0x69, 0x6c, 0x65, 0x20, 0x50, 0x72, 0x6f, 0x64, 0x75, 0x63, 0x65, 0x64, 0x20, 0x77, 0x69, 0x74, 0x68, 0x20,
    0x47, 0x50, 0x41, 0x43, 0x20, 0x30, 0x2e, 0x35, 0x2e, 0x32, 0x2d, 0x44, 0x45, 0x56, 0x2d, 0x72, 0x65, 0x76, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6f,
    0x6e, 0x3a, 0x20, 0x30, 0x2e, 0x35, 0x2e, 0x32, 0x2d, 0x34, 0x32, 0x36, 0x2d, 0x67, 0x63, 0x35, 0x61, 0x64, 0x34, 0x65, 0x34, 0x2b, 0x64, 0x66,
    0x73, 0x67, 0x35, 0x2d, 0x31, 0x62, 0x75, 0x69, 0x6c, 0x64, 0x31, 0x00, 0x00, 0x00, 0x03, 0x2d, 0x6d, 0x6f, 0x6f, 0x76, 0x00, 0x00, 0x00, 0x6c,
    0x6d, 0x76, 0x68, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xe8, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x48, 0x6d, 0x76, 0x65, 0x78, 0x00, 0x00, 0x00, 0x10, 0x6d, 0x65, 0x68, 0x64,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x36, 0xee, 0x80, 0x00, 0x00, 0x00, 0x20, 0x74, 0x72, 0x65, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x74, 0x72, 0x65, 0x70,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x02, 0x0f, 0x74, 0x72, 0x61, 0x6b, 0x00, 0x00, 0x00, 0x5c, 0x74, 0x6b, 0x68, 0x64,
    0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0xd5, 0x93, 0xd1, 0x50, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x40, 0x00, 0x00, 0x00, 0x02, 0x80, 0x00, 0x00, 0x01, 0x68, 0x00, 0x00, 0x00, 0x00, 0x00, 0x24, 0x65, 0x64, 0x74, 0x73, 0x00, 0x00, 0x00, 0x1c,
    0x65, 0x6c, 0x73, 0x74, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x01, 0x87, 0x6d, 0x64, 0x69, 0x61, 0x00, 0x00, 0x00, 0x20, 0x6d, 0x64, 0x68, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x15, 0xc7, 0x00, 0x00, 0x00, 0x00, 0x00, 0x2d, 0x68, 0x64, 0x6c, 0x72,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x76, 0x69, 0x64, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00, 0x00, 0x00, 0x01, 0x32, 0x6d, 0x69, 0x6e, 0x66, 0x00, 0x00, 0x00,
    0x14, 0x76, 0x6d, 0x68, 0x64, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x24, 0x64, 0x69, 0x6e,
    0x66, 0x00, 0x00, 0x00, 0x1c, 0x64, 0x72, 0x65, 0x66, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x0c, 0x75, 0x72, 0x6c,
    0x20, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0xf2, 0x73, 0x74, 0x62, 0x6c, 0x00, 0x00, 0x00, 0xa6, 0x73, 0x74, 0x73, 0x64, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x96, 0x61, 0x76, 0x63, 0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x80, 0x01, 0x68, 0x00, 0x48, 0x00, 0x00, 0x00, 0x48, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0xff, 0xff, 0x00, 0x00, 0x00, 0x40, 0x61,
    0x76, 0x63, 0x43, 0x01, 0x64, 0x00, 0x1e, 0xff, 0xe1, 0x00, 0x24, 0x67, 0x64, 0x00, 0x1e, 0xac, 0xd9, 0x40, 0xa0, 0x2f, 0xf9, 0x61, 0x00, 0x00,
    0x03, 0x00, 0x01, 0x00, 0x00, 0x03, 0x00, 0x3c, 0x60, 0x40, 0x01, 0x24, 0xf0, 0x00, 0x49, 0x3f, 0x9a, 0x4c, 0x01, 0xe2, 0xc5, 0xb2, 0xc0, 0x01,
    0x00, 0x05, 0x68, 0xeb, 0xec, 0xb2, 0x2c, 0xfc, 0xf8, 0xf8, 0x00, 0x00, 0x00, 0x00, 0x10, 0x73, 0x74, 0x74, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x73, 0x74, 0x73, 0x63, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x14, 0x73,
    0x74, 0x73, 0x7a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x73, 0x74, 0x63, 0x6f, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x62, 0x75, 0x64, 0x74, 0x61, 0x00, 0x00, 0x00, 0x5a, 0x6d, 0x65, 0x74, 0x61, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x21, 0x68, 0x64, 0x6c, 0x72, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6d, 0x64, 0x69, 0x72, 0x61,
    0x70, 0x70, 0x6c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x2d, 0x69, 0x6c, 0x73, 0x74, 0x00, 0x00, 0x00, 0x25,
    0xa9, 0x74, 0x6f, 0x6f, 0x00, 0x00, 0x00, 0x1d, 0x64, 0x61, 0x74, 0x61, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x4c, 0x61, 0x76, 0x66,
    0x35, 0x36, 0x2e, 0x34, 0x30, 0x2e, 0x31, 0x30, 0x31];

const initSegmentIncompleted = [
    0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x35, 0x00, 0x00, 0x00, 0x01, 0x61, 0x76, 0x63, 0x31, 0x69, 0x73, 0x6f, 0x35,
    0x64, 0x61, 0x73, 0x68, 0x00, 0x00, 0x00, 0x08, 0x66, 0x72, 0x65, 0x65, 0x00, 0x00, 0x00, 0x60, 0x66, 0x72, 0x65, 0x65, 0x49, 0x73, 0x6f, 0x4d,
    0x65, 0x64, 0x69, 0x61, 0x20, 0x46, 0x69, 0x6c, 0x65, 0x20, 0x50, 0x72, 0x6f, 0x64, 0x75, 0x63, 0x65, 0x64, 0x20, 0x77, 0x69, 0x74, 0x68, 0x20,
    0x47, 0x50, 0x41, 0x43, 0x20, 0x30, 0x2e, 0x35, 0x2e, 0x32, 0x2d, 0x44, 0x45, 0x56, 0x2d, 0x72, 0x65, 0x76, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6f,
    0x6e, 0x3a, 0x20, 0x30, 0x2e, 0x35, 0x2e, 0x32, 0x2d, 0x34, 0x32, 0x36, 0x2d, 0x67, 0x63, 0x35, 0x61, 0x64, 0x34, 0x65, 0x34, 0x2b, 0x64, 0x66];

describe('BoxParser', function () {
    describe('when no data is provided', () => {
        it('should return false when data is null or not defined', () => {
            const res = boxParser.findLastTopIsoBoxCompleted(['ftyp'], null);

            expect(res.found).to.be.false;
        });

        it('should return false when data is empty', () => {
            const data = new ArrayBuffer();
            const res = boxParser.findLastTopIsoBoxCompleted(['ftyp'], data);

            expect(res.found).to.be.false;
        });

        it('should return false when data length is lower than offset', () => {
            const data = new ArrayBuffer(5);
            const res = boxParser.findLastTopIsoBoxCompleted(['ftyp'], data, 10);

            expect(res.found).to.be.false;
        });

        it('should return false when data to read is lower than 8', () => {
            const data = new ArrayBuffer(16);
            const res = boxParser.findLastTopIsoBoxCompleted(['ftyp'], data, 12);

            expect(res.found).to.be.false;
        });

        it('should return null when data is empty', () => {
            const res = boxParser.findInitRange();

            expect(res).to.be.null;
        });
    });

    describe('when data is provided', () => {
        it('should return true when looking for a box that is completed', () => {
            const data = new Uint8Array(ftypCompleted);
            const res = boxParser.findLastTopIsoBoxCompleted(['ftyp'], data.buffer);

            expect(res.found).to.be.true;
        });

        it('should return false when looking for a box that is not completed', () => {
            const data = new Uint8Array(ftypIncompleted);
            const res = boxParser.findLastTopIsoBoxCompleted(['ftyp'], data.buffer);

            expect(res.found).to.be.false;
        });

        it('should return true when looking for completed boxes in a buffer with multiple top boxes', () => {
            const data = new Uint8Array(initSegmentCompleted);
            let res = boxParser.findLastTopIsoBoxCompleted(['ftyp'], data.buffer);
            expect(res.found).to.be.true;

            res = boxParser.findLastTopIsoBoxCompleted(['moov'], data.buffer);
            expect(res.found).to.be.true;
        });

        it('should return true when looking for completed boxes and using offset values', () => {
            const data = new Uint8Array(initSegmentCompleted);

            const res = boxParser.findLastTopIsoBoxCompleted(['ftyp', 'moov'], data.buffer, 132);
            expect(res.found).to.be.true;
        });

        it('should return offset of the last completed box when the specified box type is not found', () => {
            const data = new Uint8Array(initSegmentIncompleted);

            const res = boxParser.findLastTopIsoBoxCompleted(['moov'], data.buffer);
            expect(res.found).to.be.false;
            expect(res.lastCompletedOffset).to.equal(36);
        });

        it('should not return null when looking for init range in a completed init segment', () => {
            const data = new Uint8Array(initSegmentCompleted);
            let res = boxParser.findInitRange(data.buffer);
            expect(res).not.to.be.null;
            expect(res).to.equal('0-944');
        });
    });

    describe('when no sample is defined', () => {
        it('should return an object with an empty array called samplesInfo.sampleList when getSamplesInfo is called and sample is undefined', () => {
            const samplesInfo = boxParser.getSamplesInfo();

            expect(samplesInfo.sampleList).to.be.instanceOf(Array);
            expect(samplesInfo.sampleList).to.be.empty;
        });

        it('should return NaN when getMediaTimescaleFromMoov is called and sample is undefined', () => {
            const timeScale = boxParser.getMediaTimescaleFromMoov();

            expect(timeScale).to.be.NaN;
        });
    });
});