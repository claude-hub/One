import 'package:flutter/material.dart';
import 'package:one_app/src/rust/api/init.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Column(children: [
        Text("Joe"),
        Text(
            'Action: Call Rust `greet("Tom")`\nResult: `${greet(name: "Tom")}`'),
        Expanded(
            child: ListView.builder(
          itemBuilder: (context, index) {
            return Text('111');
          },
          itemCount: 20,
        ))
      ])),
    );
  }
}
