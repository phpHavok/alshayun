TARGET := qds-backend.sif

$(TARGET): Singularity
	sudo singularity build -F $@ $<

start: $(TARGET)
	singularity instance start -B articles:/srv/articles \
		$(TARGET) qds-backend

stop:
	singularity instance stop -F qds-backend

run: $(TARGET)
	singularity run -p -B articles:/srv/articles $(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: start stop run clean
