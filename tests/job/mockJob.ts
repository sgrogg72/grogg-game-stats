export const mockJob = {

  trackInvocation: jest.fn(),

  stopTrackingInvocation: jest.fn(),

  triggeredJobs: 0,

  setTriggeredJobs: jest.fn(),

  cancel: jest.fn(),

  cancelNext: jest.fn(),

  reschedule: jest.fn(),

  nextInvocation: new Date(),

  pendingInvocations: jest.fn(),

  invoke: jest.fn(),

  runOnDate: new Date(),

  schedule: jest.fn(),
}