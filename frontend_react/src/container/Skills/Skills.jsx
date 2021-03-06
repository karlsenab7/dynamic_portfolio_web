import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';

import './Skills.scss';

const Skills = () => {

    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [tooltip, showTooltip] = useState(true);

    useEffect(() => {
        const querySkills = '*[_type == "skills"]';
        const queryExp = '*[_type == "experiences"]';

        client.fetch(querySkills)
            .then((data) => {
                setSkills(data);
            })

        client.fetch(queryExp)
            .then((data) => {
                setExperiences(data);
            })
    }, []);


    return (
        <>
            <h2 className='head-text'>Skills And Experiences</h2>

            <div className='app__skills-container'>
                <motion.div className='app__skills-list'>
                    {skills.map((skill) => (
                        <motion.div
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                            className='app__skills-item app__flex'
                            key={skill.name}
                        >
                            <div className='app__flex' style={{ backgroundColor: skill.bgColor }}>
                                <img src={urlFor(skill.icon)} alt={skill.name} />
                            </div>
                            <p className='p-text'>{skill.name}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className='app__skills-exp'>
                    {experiences.map((experience) => (
                        <motion.div
                            className='app__skills-exp-item'
                            key={experience.year}
                        >
                            <div className='app__skills-exp-year'>
                                <p className='bold-text'>{experience.year}</p>
                            </div>

                            <motion.div className='app__skills-exp-works'>
                                {experience.works.map((work) => (
                                    <React.Fragment key={work.name}>
                                        <motion.div
                                            whileInView={{ opacity: [0, 1] }}
                                            transition={{ duration: 0.5 }}
                                            className='app__skills-exp-work'
                                            data-tip=''
                                            data-for={work.name}
                                            // data-event={tooltip}
                                            // data-event-off={!tooltip}
                                            // onHoverStart={showTooltip(true)}
                                            // onHoverEnd={showTooltip(false)}
                                        >
                                            <h4 className='bold-text'>{work.name}</h4>
                                            <p className='p-text'>{work.company}</p>
                                        </motion.div>

                                        <ReactTooltip
                                            id={work.name}
                                            effect="solid"
                                            arrowColor="#fff"
                                            className="skills-tooltip"
                                            // event="click"
                                            // eventOff='dblclick'
                                            getContent={(data) => { 
                                                if (data) {
                                                    return work.desc;
                                                } else {
                                                    return null
                                                }
                                             }}
                                        >
                                            {/* {work.desc} */}
                                        </ReactTooltip>

                                    </React.Fragment>
                                ))}
                            </motion.div>

                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    )
}

export default AppWrap(
    MotionWrap(Skills, 'app__skills'),
    'skills', 
    'app__whitebg'
  );