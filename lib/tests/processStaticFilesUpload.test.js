const upload = require('../processStaticFiles');
var fs = require('fs');

describe('buildpack is not properly configured', () => {
    it('build will fail with error', async () => {
        process.env.ENV_DIR = '/';
        const mockExit = jest.spyOn(process, 'exit')
            .mockImplementation((number) => { throw new Error('process.exit: ' + number); });
        expect(() => {
            upload();
        }).toThrow();
        expect(mockExit).toHaveBeenCalledWith(1);
        mockExit.mockRestore();
      });
})

describe('review app build', () => {
    it("exits without error", () => {
        process.env.ENV_DIR = '/';
        jest.spyOn(fs, 'readdirSync').mockReturnValue(['DISABLE_ASSET_UPLOAD'])
        jest.spyOn(fs, 'readFileSync').mockReturnValue('true')
        const mockExit = jest.spyOn(process, 'exit')
                .mockImplementation((number) => { throw new Error('process.exit: ' + number); });
        expect(() => {
            upload();
        }).toThrow();
        expect(mockExit).toHaveBeenCalledWith(0);
        mockExit.mockRestore();
    })
})
