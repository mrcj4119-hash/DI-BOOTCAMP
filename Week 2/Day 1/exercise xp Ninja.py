class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        call_record = (
            f"{self.phone_number} called {other_phone.phone_number}"
        )
        print(call_record)
        self.call_history.append(call_record)

    def show_call_history(self):
        print(self.call_history)

    def send_message(self, other_phone, content):
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }

        self.messages.append(message)
        other_phone.messages.append(message)

    def show_outgoing_messages(self):
        outgoing = [
            message for message in self.messages
            if message["from"] == self.phone_number
        ]
        print(outgoing)

    def show_incoming_messages(self):
        incoming = [
            message for message in self.messages
            if message["to"] == self.phone_number
        ]
        print(incoming)

    def show_messages_from(self, phone_number):
        messages = [
            message for message in self.messages
            if message["from"] == phone_number
        ]
        print(messages)


phone1 = Phone("111-111-1111")
phone2 = Phone("222-222-2222")
phone3 = Phone("333-333-3333")

phone1.call(phone2)
phone1.call(phone3)

print("\nPhone 1 call history:")
phone1.show_call_history()

phone1.send_message(phone2, "Hello, how are you?")
phone2.send_message(phone1, "I am fine, thank you!")
phone3.send_message(phone1, "Are you available later?")

print("\nPhone 1 outgoing messages:")
phone1.show_outgoing_messages()

print("\nPhone 1 incoming messages:")
phone1.show_incoming_messages()

print("\nMessages received from Phone 3:")
phone1.show_messages_from(phone3.phone_number)