
import { getHealth } from '../../application/use-cases/health-check/get-health-check';

module.exports = {

  healthCheck() {
    // Treatment
    const body = getHealth();

    // Output
    return {
      statusCode: 200,
      body
    };
  }
};
