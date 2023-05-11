class Service {
  constructor(
    id,
    admin_id,
    name,
    description,
    price_range,
    category,
    active,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.admin_id = admin_id;
    this.name = name;
    this.description = description;
    this.price_range = price_range;
    this.category = category;
    this.active = active;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default Service;
