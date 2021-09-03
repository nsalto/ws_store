module.exports = {
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
      select: true
    },
    updated_at: {
      type: 'timestamp',
      onUpdate: 'CURRENT_TIMESTAMP',
      nullable: true,
      select: false
    },
    deleted_at: {
      type: 'timestamp',
      onDelete: 'CURRENT_TIMESTAMP(6)',
      nullable: true,
      select: false
    }
  };
  