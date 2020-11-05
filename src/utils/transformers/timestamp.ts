const to = (value?: Date): Date | unknown => value ? Math.round(value.getTime() / 1000) : value;

const from = (value?: number): Date | unknown => value ? new Date(value * 1000) : value;

const timestamp = {
  to,
  from
}

export default timestamp;
