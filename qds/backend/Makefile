TARGET := qds-backend.sif

$(TARGET): Singularity
	sudo singularity build -F $@ $<

start: $(TARGET)
	singularity instance start $(TARGET) qds-backend

stop:
	singularity instance stop -F qds-backend

run: $(TARGET)
	singularity run -p $(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: start stop run clean
