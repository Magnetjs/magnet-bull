"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const Queue = require("bull");
class MagnetBull extends module_1.Module {
    init() {
        this.moduleName = 'bull';
        this.defaultConfig = __dirname;
    }
    factory(name = 'main', config) {
        const queue = Queue(name, config);
        // queue
        // .on('ready', () => {
        //   this.log.info('bull: ready')
        //   // Queue ready for job
        //   // All Redis connections are done
        // })
        // .on('error', (error) => {
        //   this.log.info('bull: error', error)
        //   // Error
        // })
        // .on('active', (job, jobPromise) => {
        //   this.log.info('bull: active')
        //   // Job started
        //   // You can use jobPromise.cancel() to abort this job.
        // })
        // .on('stalled', (job) => {
        //   this.log.info('bull: stalled')
        //   // Job that was considered stalled. Useful for debugging job workers that crash or pause the event loop.
        // })
        // .on('progress', (job, progress) => {
        //   this.log.info('bull: progress')
        //   // Job progress updated!
        // })
        // .on('completed', (job, result) => {
        //   this.log.info('bull: completed')
        //   // Job completed with output result!
        // })
        // .on('failed', (job, err) => {
        //   this.log.info('bull: failed', job, err)
        //   // Job failed with reason err!
        // })
        // .on('paused', () => {
        //   this.log.info('bull: paused')
        //   // The queue has been paused
        // })
        // .on('resumed', (job) => {
        //   this.log.info('bull: resumed')
        //   // The queue has been resumed
        // })
        // .on('cleaned', (jobs, type) => {
        //   this.log.info('bull: cleaned')
        //   //jobs is an array of cleaned jobs
        //   //type is the type of job cleaned
        //   //see clean for details
        // })
        return queue;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.insert(this.factory('main', this.config));
        });
    }
    teardown() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.bull.close();
        });
    }
}
exports.default = MagnetBull;
//# sourceMappingURL=index.js.map