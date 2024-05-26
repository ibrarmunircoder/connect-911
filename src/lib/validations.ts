import Joi from 'joi';

export const createAgentSchema = Joi.object({
  agent_name: Joi.string().required().min(8).max(100),
  tenant_id: Joi.string().required(),
  location_type: Joi.string().required().valid('office', 'remote'),
});
