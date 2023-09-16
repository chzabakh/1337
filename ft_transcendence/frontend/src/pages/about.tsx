import Layout from '@/components/Layout/layout'
import Card from '@/components/Sections/card'
import Stars from '@/components/Sections/stars'
import Link from 'next/link'
import React from 'react'

const contributers = [
  {
    id: 1,
    name: "oufisaou",
    linkedin: "https://www.linkedin.com/in/oumaimafisaoui/",
    github: "https://github.com/Oumaimafisaoui",
    picture: "/oufisaou.jpeg",
  },
  {
    id: 2,
    name: "sayar",
    linkedin: "https://www.linkedin.com/in/saad-ayar/",
    github: "https://github.com/DayneeBoiiz",
    picture: "/sayar.jpeg",
  },
  {
    id: 3,
    name: "chzabakh",
    linkedin: "https://www.linkedin.com/in/charaf-eddine-zabakh-a52732130/",
    github: "https://github.com/chzabakh",
    picture: "/chzabakh.jpeg",
  },
  {
    id: 4,
    name: "schahid",
    linkedin: "https://www.linkedin.com/in/soufiane-chahid-b15931204",
    github: "https://github.com/chahid001",
    picture: "/schahid.jpeg",
  }
]

const About = () => {
  return (
    <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen max-h-screen">
      <Layout>
        <Stars />
        <div className='flex flex-col gap-2 w-full h-[70%]'>
          <div className='self-center text-[19px] font-inter tracking-wider'>
            This project is made by:
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-evenly w-full h-full">
            {contributers.map((member) => (
              <div className="mb-4 sm:mb-0  hidden sm:block" key={member.id}>
                <Card
                  name={member.name}
                  linkedin={member.linkedin}
                  github={member.github}
                  picture={member.picture}
                />
              </div>
            ))}
            {contributers.map((member) => (
              <div className="mb-4 sm:hidden hover:text-purple-500 font-inter font-bold  tracking-widest " key={member.id}>
                <Link href={member.github} target="blank" className="hover:text-purple-500 border-2 px-4 py-2  rounded-full text-purple-300">{member.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;
