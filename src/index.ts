import { Module } from 'magnet-core/module'
import * as Queue from 'bull'

export default class MagnetBull extends Module {
  get moduleName () { return 'bull' }
  get defaultConfig () { return __dirname }

  factory (name = 'main', config) {
    let queue
    if (config.magnet) {
      queue = Queue(name, this.app[config.magnet])
    } else {
      queue = Queue(name, config.host, config.port)
    }

    queue
    .on('ready', () => {
      this.log.info('bull: ready')
      // Queue ready for job
      // All Redis connections are done
    })
    .on('error', (error) => {
      this.log.info('bull: error', error)
      // Error
    })
    .on('active', (job, jobPromise) => {
      this.log.info('bull: active')
      // Job started
      // You can use jobPromise.cancel() to abort this job.
    })
    .on('stalled', (job) => {
      this.log.info('bull: stalled')
      // Job that was considered stalled. Useful for debugging job workers that crash or pause the event loop.
    })
    .on('progress', (job, progress) => {
      this.log.info('bull: progress')
      // Job progress updated!
    })
    .on('completed', (job, result) => {
      this.log.info('bull: completed')
      // Job completed with output result!
    })
    .on('failed', (job, err) => {
      this.log.info('bull: failed', job, err)
      // Job failed with reason err!
    })
    .on('paused', () => {
      this.log.info('bull: paused')
      // The queue has been paused
    })
    .on('resumed', (job) => {
      this.log.info('bull: resumed')
      // The queue has been resumed
    })
    .on('cleaned', (jobs, type) => {
      this.log.info('bull: cleaned')
      //jobs is an array of cleaned jobs
      //type is the type of job cleaned
      //see clean for details
    })

    return queue
  }

  async setup () {
    this.insert(this.factory('main', this.config))
  }

  async teardown () {
    this.app.bull.close()
  }
}
